import { formCopy } from '../data/forms';
import { categories } from '../data/categories';
import { route, type Locale } from '../data/site';
import {
  readSelection,
  selectionParams,
  selectionFromForm,
  type Selection,
} from '../lib/selections';
const form = document.querySelector<HTMLFormElement>('#project-form');
if (form) {
  const lang = form.dataset.lang as Locale;
  const f = formCopy[lang];
  const contact = form.dataset.kind === 'contact';
  const summary = document.querySelector('#selection-summary')!;
  const languageLink = document.querySelector<HTMLAnchorElement>('[data-language]');
  const edit = document.querySelector<HTMLAnchorElement>('#edit-selection');
  const professionalFields = document.querySelector<HTMLElement>('#professional-fields');
  const labels = (s: Selection) => [
    [f.audience, f.audienceOptions[s.audience as keyof typeof f.audienceOptions]],
    [f.project, f.projectOptions[s.project as keyof typeof f.projectOptions]],
    [f.stage, f.stageOptions[s.stage as keyof typeof f.stageOptions]],
    [
      f.systems,
      categories
        .filter((c) => s.systems.includes(c.id))
        .map((c) => c[lang].name)
        .join(', ') || f.noSystems,
    ],
  ];
  const restore = () => {
    const selection = readSelection(new URLSearchParams(location.search));
    form
      .querySelectorAll<HTMLInputElement>(
        'input[name="audience"], input[name="project"], input[name="systems"]',
      )
      .forEach((input) => {
        input.checked =
          input.name === 'systems'
            ? selection.systems.includes(input.value)
            : selection[input.name as 'audience' | 'project'] === input.value;
      });
    (form.elements.namedItem('stage') as HTMLSelectElement).value = selection.stage;
    update(false);
  };
  const update = (writeUrl = true) => {
    const selection = selectionFromForm(form);
    const params = selectionParams(selection).toString();
    if (writeUrl)
      history.replaceState(null, '', `${location.pathname}${params ? `?${params}` : ''}`);
    summary.replaceChildren(
      ...labels(selection).map(([label, value]) => {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        const span = document.createElement('span');
        strong.textContent = label;
        span.textContent = value;
        li.append(strong, span);
        return li;
      }),
    );
    if (languageLink) languageLink.search = params;
    if (edit) edit.search = params;
    if (professionalFields) {
      professionalFields.hidden = selection.audience !== 'professional';
      professionalFields
        .querySelectorAll('input')
        .forEach((input) => (input.disabled = !!professionalFields.hidden));
    }
  };
  restore();
  addEventListener('pageshow', () => update(false));
  addEventListener('popstate', restore);
  form.addEventListener('change', (event) => {
    if (
      ['audience', 'project', 'stage', 'systems'].includes((event.target as HTMLInputElement).name)
    )
      update();
  });
  if (!contact) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      location.assign(`${route('contact', lang)}?${selectionParams(selectionFromForm(form))}`);
    });
  } else {
    const send = document.querySelector<HTMLButtonElement>('#send-inquiry')!;
    const copy = document.querySelector<HTMLButtonElement>('#copy-brief')!;
    const download = document.querySelector<HTMLButtonElement>('#download-brief')!;
    const notice = document.querySelector<HTMLElement>('#delivery-notice')!;
    const feedback = document.querySelector<HTMLElement>('#form-feedback')!;
    let available = false;
    let pending = false;
    // getRandomValues also works on an HTTP LAN preview, where randomUUID may be absent.
    const newRequestId = () =>
      Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
        byte.toString(16).padStart(2, '0'),
      ).join('');
    let requestId = newRequestId();
    let lastPayload = '';
    form.noValidate = true;
    copy.disabled = download.disabled = false;
    notice.textContent = f.checking;
    fetch('/api/inquiries', { cache: 'no-store', signal: AbortSignal.timeout(8000) })
      .then(async (res) => {
        const body = await res.json();
        available = res.ok && body.available === true;
      })
      .catch(() => {
        available = false;
      })
      .finally(() => {
        notice.textContent = available ? f.ready : f.unavailable;
        send.disabled = !available;
      });
    const brief = () => {
      const data = new FormData(form);
      return [
        f.draftTitle,
        '',
        ...labels(selectionFromForm(form)).map(([k, v]) => `${k}: ${v}`),
        '',
        ...(['name', 'email', 'locality', 'phone', 'company', 'role', 'description'] as const).map(
          (key) => `${f[key]}: ${data.get(key) || '—'}`,
        ),
        '',
        lang === 'ro'
          ? 'Document salvat local. Nu este o cerere trimisă și nu reprezintă o ofertă.'
          : 'Saved locally. This is not a submitted inquiry or a quotation.',
      ].join('\n');
    };
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(brief());
        feedback.textContent = f.copied;
      } catch {
        feedback.textContent = f.copyError;
      }
    });
    download.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([brief()], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `casa-ta-verde-${lang === 'ro' ? 'proiect' : 'brief'}.txt`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      feedback.textContent = f.downloaded;
    });
    const fieldError = (name: string, message: string) => {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      if (input) {
        if (message) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
      }
      const error = document.getElementById(`${name}-error`);
      if (error) error.textContent = message;
    };
    form.addEventListener('input', (event) => {
      const name = (event.target as HTMLInputElement).name;
      fieldError(name, '');
      feedback.textContent = '';
    });
    form.addEventListener('change', () => {
      if (!pending) feedback.textContent = '';
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!available || pending) {
        feedback.textContent = f.unavailable;
        return;
      }
      let firstInvalid: HTMLInputElement | undefined;
      for (const key of ['name', 'email', 'locality', 'phone']) {
        const input = form.elements.namedItem(key) as HTMLInputElement;
        let error = '';
        if (input.required && !input.value.trim()) error = f.required;
        else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()))
          error = f.invalidEmail;
        else if (
          key === 'phone' &&
          input.value.trim() &&
          (!/^[+\d() .-]{6,32}$/.test(input.value.trim()) ||
            input.value.replace(/\D/g, '').length < 6 ||
            input.value.replace(/\D/g, '').length > 15)
        )
          error = f.invalidPhone;
        fieldError(key, error);
        if (error && !firstInvalid) firstInvalid = input;
      }
      if (firstInvalid) {
        feedback.textContent = f.invalid;
        firstInvalid.focus();
        return;
      }
      const data = new FormData(form);
      const payload = { ...Object.fromEntries(data), ...selectionFromForm(form), lang };
      const serialized = JSON.stringify(payload);
      if (serialized !== lastPayload) {
        requestId = newRequestId();
        lastPayload = serialized;
      }
      const lockedFields = [
        ...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
          'input,select,textarea',
        ),
      ].map((input) => ({ input, disabled: input.disabled }));
      lockedFields.forEach(({ input }) => (input.disabled = true));
      copy.disabled = download.disabled = true;
      pending = true;
      send.disabled = true;
      send.textContent = f.sending;
      feedback.textContent = '';
      form.setAttribute('aria-busy', 'true');
      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
          body: serialized,
          signal: AbortSignal.timeout(12000),
        });
        const body = await res.json();
        if (res.ok && body.accepted === true && typeof body.id === 'string') {
          feedback.textContent = `${f.success} ${body.id}`;
          feedback.focus();
        } else if (res.status === 503) {
          available = false;
          notice.textContent = f.unavailable;
          feedback.textContent = f.unavailable;
        } else if (res.status === 422) {
          feedback.textContent = f.invalid;
          for (const key of body.fields || [])
            fieldError(key, key === 'email' ? f.invalidEmail : f.required);
          (form.querySelector('[aria-invalid="true"]') as HTMLElement)?.focus();
        } else feedback.textContent = f.error;
      } catch {
        feedback.textContent = f.error;
      } finally {
        lockedFields.forEach(({ input, disabled }) => (input.disabled = disabled));
        copy.disabled = download.disabled = false;
        pending = false;
        send.disabled = !available;
        send.textContent = f.send;
        form.removeAttribute('aria-busy');
      }
    });
  }
}
