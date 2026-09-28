/** Shared architectural motion. HTML is always visible before/without this module. */
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const compact = matchMedia('(max-width: 850px), (pointer: coarse)');
const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } })
  .connection;
const easing = 'cubic-bezier(.16,.65,.24,1)';
const running = new Map<Animation, Element>();
const revealed = new WeakSet<Element>();
let dispose = () => {};

function animate(element: Element, frames: Keyframe[], duration: number, delay = 0) {
  const animation = element.animate(frames, { duration, delay, easing, fill: 'backwards' });
  running.set(animation, element);
  const release = () => running.delete(animation);
  animation.addEventListener('finish', release, { once: true });
  animation.addEventListener('cancel', release, { once: true });
}

// Keep focus targets and deliberate interactions stationary, even mid-entrance.
function settleWithin(container: Element) {
  for (const [animation, element] of running) {
    if (container.contains(element) || element.contains(container)) animation.cancel();
  }
}
document.addEventListener('focusin', (event) => {
  // Keyboard focus should settle immediately. Pointer focus must not move a link
  // between pointerdown and pointerup, which could otherwise cancel the click.
  if (event.target instanceof Element && event.target.matches(':focus-visible')) {
    settleWithin(event.target);
  }
});
document.querySelector('[data-ecosystem]')?.addEventListener(
  'toggle',
  (event) => {
    if (event.target instanceof HTMLDetailsElement) {
      settleWithin(event.currentTarget as Element);
    }
  },
  true,
);

function initialize() {
  dispose();
  for (const animation of running.keys()) animation.cancel();
  const mode =
    reduced.matches ||
    connection?.saveData ||
    !('IntersectionObserver' in window) ||
    !('ResizeObserver' in window) ||
    !Element.prototype.animate
      ? 'off'
      : navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4
        ? 'lite'
        : 'full';
  root.dataset.motion = mode;
  document
    .querySelector('[data-ecosystem]')
    ?.classList.toggle('low-motion', mode !== 'full' || compact.matches);
  if (mode !== 'full') return;

  const enter = (element: HTMLElement | SVGElement, index = 0, hero = false) => {
    if (revealed.has(element)) return;
    revealed.add(element);
    element.classList.add('motion-entered');
    if (element.contains(document.activeElement)) return;
    // Keep headings and footer copy inside their shorter surrounding gaps.
    const framedCopy = hero || !!element.closest('.section-heading, .footer-top');
    const distance = element.closest('.footer-top')
      ? 32
      : compact.matches
        ? framedCopy
          ? 32
          : 44
        : framedCopy
          ? 48
          : 72;
    animate(
      element,
      [
        { opacity: 1, transform: `translate3d(0,${distance}px,0)` },
        { opacity: 1, transform: 'translate3d(0,0,0)' },
      ],
      hero ? 1700 : 1400,
      Math.min(index * 160, 480),
    );
  };

  // Hero copy stays opaque. It can be read and clicked from the first frame.
  document
    .querySelectorAll<HTMLElement>('.hero-intro > *, .compact-intro > *, .inner-hero > h1')
    .forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) enter(element, index, true);
    });

  const entrances = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        entrances.unobserve(element);
        if (element.matches('.house-drawing')) {
          if (revealed.has(element)) continue;
          revealed.add(element);
          if (!element.closest('.low-motion')) {
            element.querySelectorAll<SVGElement>('[data-layer]').forEach((layer, i) => {
              const paths: Record<string, string> = {
                ceiling: 'translate(0, 52px)',
                roof: 'translate(-64px, -24px)',
                solar: 'translate(0, -84px)',
                rain: 'translate(34px, 30px)',
                heat: 'translate(-36px, 42px)',
                smart: 'translate(36px, -48px)',
              };
              const from = paths[layer.dataset.layer || ''] ?? 'translateY(52px)';
              animate(
                layer,
                [
                  { opacity: 0.35, transform: from },
                  { opacity: 1, transform: getComputedStyle(layer).transform },
                ],
                1600,
                i * 110,
              );
            });
          }
        } else {
          const index = Number(element.dataset.motionOrder || 0);
          enter(element, index);
        }
      }
    },
    { threshold: 0.08 },
  );

  // Group-level entrances avoid a long procession of individually animated paragraphs.
  const groups = [
    '.section-heading',
    '.family-features',
    '.editorial-split',
    '.audience-section > .page-container',
    '.audience-split',
    '.process-steps',
    '.faq-section',
    '.project-cta',
    '.footer-top',
  ];
  for (const selector of groups) {
    document.querySelectorAll(selector).forEach((group) => {
      [...group.children].forEach((child, index) => {
        if (!(child instanceof HTMLElement) || child.matches('.audience-split')) return;
        child.dataset.motionOrder = String(index);
        entrances.observe(child);
      });
    });
  }
  document
    .querySelectorAll('.house-drawing, .family-index')
    .forEach((element) => entrances.observe(element));

  type Parallax = {
    frame: HTMLElement;
    image: HTMLImageElement;
    top: number;
    height: number;
    range: number;
  };
  const photos: Parallax[] = [...document.querySelectorAll<HTMLElement>('[data-parallax]')].flatMap(
    (frame) => {
      const image = frame.querySelector('img');
      return image ? [{ frame, image, top: 0, height: 0, range: 0 }] : [];
    },
  );
  const active = new Set<Parallax>();
  const byFrame = new Map(photos.map((photo) => [photo.frame, photo]));
  let frameId = 0;
  let needsMeasure = true;
  let viewportHeight = innerHeight;

  function draw() {
    frameId = 0;
    const scroll = scrollY;
    // All reads precede writes. Scroll-only frames use the cached document coordinates.
    if (needsMeasure) {
      viewportHeight = innerHeight;
      for (const photo of photos) {
        const rect = photo.frame.getBoundingClientRect();
        photo.top = rect.top + scroll;
        photo.height = rect.height;
        photo.range =
          parseFloat(getComputedStyle(photo.frame).getPropertyValue('--parallax-range')) || 0;
      }
      needsMeasure = false;
    }
    for (const photo of active) {
      const progress = Math.max(
        0,
        Math.min(1, (scroll + viewportHeight - photo.top) / (viewportHeight + photo.height)),
      );
      const offset = (progress * 2 - 1) * photo.range;
      photo.frame.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
    }
  }
  function requestDraw() {
    if (!frameId && !document.hidden) frameId = requestAnimationFrame(draw);
  }
  function measure() {
    needsMeasure = true;
    requestDraw();
  }
  const visibility = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const photo = byFrame.get(entry.target as HTMLElement);
        if (!photo) continue;
        if (entry.isIntersecting) {
          active.add(photo);
          photo.image.style.willChange = 'transform';
        } else {
          active.delete(photo);
          photo.image.style.removeProperty('will-change');
        }
      }
      requestDraw();
    },
    { rootMargin: '100px 0px' },
  );
  photos.forEach((photo) => visibility.observe(photo.frame));
  const resize = new ResizeObserver(measure);
  if (photos.length) {
    resize.observe(document.body);
    photos.forEach((photo) => resize.observe(photo.frame));
    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    document.addEventListener('toggle', measure, true);
    document.addEventListener('visibilitychange', measure);
    window.addEventListener('pageshow', measure);
    measure();
  }
  if (scrollY < 20) {
    const image = document.querySelector('.hero-figure img, .category-image img');
    if (image && !revealed.has(image)) {
      revealed.add(image);
      animate(image, [{ scale: '1.14' }, { scale: '1' }], 2400);
    }
  }

  dispose = () => {
    entrances.disconnect();
    visibility.disconnect();
    resize.disconnect();
    cancelAnimationFrame(frameId);
    window.removeEventListener('scroll', requestDraw);
    window.removeEventListener('resize', measure);
    document.removeEventListener('toggle', measure, true);
    document.removeEventListener('visibilitychange', measure);
    window.removeEventListener('pageshow', measure);
    photos.forEach(({ frame, image }) => {
      frame.style.removeProperty('--parallax-y');
      image.style.removeProperty('will-change');
    });
  };
}

initialize();
reduced.addEventListener('change', initialize);
compact.addEventListener('change', initialize);
connection?.addEventListener('change', initialize);
