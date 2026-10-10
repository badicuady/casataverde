import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import type * as THREE from 'three';
import { gsap } from 'gsap';
import { MotionScope } from './motion-scope';
import { Icon } from './icon';
import { Language } from '../data/content';
import { ecosystemCopy } from '../data/ecosystem';
@Component({
  selector: 'app-energy-field',
  standalone: true,
  imports: [Icon],
  template: `<section class="energy-field" aria-labelledby="energy-heading">
    <div class="field-content page-width">
      <p class="eyebrow">{{ copy().fieldLabel }}</p>
      <h2 id="energy-heading">
        {{ copy().connected }}<br /><span>{{ copy().connectedEnd }}</span>
      </h2>
      <p class="field-description">{{ copy().connection }}</p>
      <a href="#ecosystem">{{ copy().directory }}<app-icon /></a>
      <div class="field-index" aria-hidden="true"><span>01—07</span><span>CASA TA VERDE</span></div>
    </div>
    <div #viewport class="field-viewport" [class.loaded]="ready()" aria-hidden="true">
      <div class="field-fallback"><span></span><span></span><span></span></div>
      <canvas #canvas></canvas>
    </div>
  </section>`,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        background: radial-gradient(ellipse at 75% 55%, #15262b 0%, #0a1410 65%);
        overflow: hidden;
      }
      .energy-field {
        position: relative;
        min-height: 760px;
        display: flex;
        align-items: center;
        isolation: isolate;
      }
      .field-content {
        position: relative;
        z-index: 1;
        pointer-events: none;
        padding-block: 100px;
      }
      .eyebrow {
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--muted);
        margin: 0 0 35px;
      }
      h2 {
        font-size: clamp(60px, 7vw, 112px);
        line-height: 1.02;
        font-weight: 500;
        letter-spacing: -0.065em;
        margin: 0 0 30px;
      }
      h2 span {
        color: var(--accent);
      }
      .field-description {
        font-size: 22px;
        line-height: 1.65;
        color: #b0c0c3;
        max-width: 420px;
        margin-bottom: 40px;
      }
      a {
        pointer-events: auto;
        display: inline-flex;
        gap: 28px;
        align-items: center;
        border-bottom: 1px solid var(--accent);
        padding: 12px 0;
        font-size: 14px;
      }
      a app-icon {
        color: var(--accent);
      }
      .field-index {
        margin-top: 100px;
        display: flex;
        align-items: center;
        gap: 35px;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: #93a6a1;
      }
      .field-index span:first-child {
        font-size: 17px;
        color: var(--accent);
      }
      .field-viewport {
        position: absolute;
        right: -7%;
        top: 0;
        width: 75%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }
      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      .loaded canvas {
        opacity: 1;
      }
      .field-fallback {
        position: absolute;
        inset: 18% 15%;
        transform: rotate(-28deg);
        opacity: 0.7;
      }
      .field-fallback span {
        position: absolute;
        inset: 12%;
        border: 1px solid #75e7f0;
        box-shadow:
          0 0 50px #75e7f022,
          inset 0 0 40px #ac93fa22;
        border-radius: 50%;
      }
      .field-fallback span:nth-child(2) {
        inset: 7%;
        border-color: #ac93fa88;
      }
      .field-fallback span:nth-child(3) {
        inset: 2%;
        border-color: #c6f47a44;
      }
      .loaded .field-fallback {
        opacity: 0;
      }
      @media (max-width: 1000px) {
        h2 {
          font-size: 80px;
        }
        .field-description {
          max-width: 340px;
          font-size: 19px;
        }
        .field-viewport {
          right: -20%;
          width: 90%;
        }
      }
      @media (max-width: 760px) {
        .energy-field {
          min-height: 860px;
          align-items: flex-start;
        }
        .field-content {
          padding-block: 65px 0;
        }
        .eyebrow {
          font-size: 10px;
        }
        h2 {
          font-size: clamp(48px, 15.5vw, 64px);
        }
        .field-description {
          font-size: 18px;
          max-width: 320px;
        }
        .field-viewport {
          width: 115%;
          height: 440px;
          top: auto;
          bottom: -5px;
          right: -7%;
        }
        .field-index {
          margin-top: 35px;
        }
        .field-fallback {
          inset: 15%;
        }
        .field-content a {
          font-size: 13px;
        }
      }
    `,
  ],
})
export class EnergyField implements AfterViewInit, OnDestroy {
  readonly language = input.required<Language>();
  readonly paused = input(false);
  readonly ready = signal(false);
  readonly copy = computed(() => ecosystemCopy[this.language()]);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly viewport = viewChild.required<ElementRef<HTMLDivElement>>('viewport');
  private readonly zone = inject(NgZone);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly media = matchMedia('(prefers-reduced-motion: reduce)');
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private group?: THREE.Group;
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];
  private motion?: MotionScope;
  private observer?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private frame = 0;
  private last = 0;
  private phase = 0;
  private visible = false;
  private destroyed = false;
  private loading = false;
  private contextLost = false;
  private readonly scroll = { progress: 0 };
  constructor() {
    afterRenderEffect(() => {
      const paused = this.paused();
      this.zone.runOutsideAngular(() => {
        this.motion?.setPaused(paused);
        this.sync();
      });
    });
  }
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.media.addEventListener('change', this.sync);
      document.addEventListener('visibilitychange', this.sync);
      this.canvas().nativeElement.addEventListener('webglcontextlost', this.onContextLost);
      this.observer = new IntersectionObserver(
        (entries) => {
          this.visible = entries[0].isIntersecting;
          if (this.visible && !this.loading) {
            this.loading = true;
            // The heavy WebGL module is fetched only as this section approaches the viewport.
            void import('three')
              .then((three) =>
                this.zone.runOutsideAngular(() => {
                  if (!this.destroyed) this.initialize(three);
                }),
              )
              .catch(() => {
                /* The static orbital illustration remains available. */
              });
          }
          this.sync();
        },
        { rootMargin: '150px' },
      );
      this.observer.observe(this.host.nativeElement);
    });
  }
  private initialize(three: typeof THREE): void {
    const canvas = this.canvas().nativeElement;
    const context = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!context) return;
    try {
      this.renderer = new three.WebGLRenderer({ canvas, context, alpha: true, antialias: false });
    } catch {
      return;
    }
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    this.scene = new three.Scene();
    this.camera = new three.PerspectiveCamera(45, 1, 0.1, 30);
    this.camera.position.z = 7.7;
    this.group = new three.Group();
    this.group.rotation.order = 'ZXY';
    this.scene.add(this.group);
    const count = innerWidth < 760 ? 2400 : 5600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [
      new three.Color('#75e7f0'),
      new three.Color('#ac93fa'),
      new three.Color('#c6f47a'),
    ];
    const random = (seed: number) => {
      const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    for (let i = 0; i < count; i++) {
      const u = random(i + 1) * Math.PI * 2;
      const v = random(i + 4.4) * Math.PI * 2;
      const thickness = 0.07 + Math.pow(random(i + 9.9), 2) * 0.5;
      const r = 2 + Math.cos(v) * thickness;
      positions.set([r * Math.cos(u), r * Math.sin(u), Math.sin(v) * thickness], i * 3);
      const color = palette[Math.floor((u / (Math.PI * 2)) * 3) % 3];
      colors.set([color.r, color.g, color.b], i * 3);
      sizes[i] = 0.9 + random(i + 22.2) * 2;
    }
    const geometry = new three.BufferGeometry();
    geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new three.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new three.BufferAttribute(sizes, 1));
    const material = new three.ShaderMaterial({
      uniforms: { pixelRatio: { value: this.renderer.getPixelRatio() } },
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: three.AdditiveBlending,
      vertexShader: `uniform float pixelRatio; attribute float size; varying vec3 vColor; void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=min(10.0,size*pixelRatio*(10.0/-mv.z));gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor; void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;float a=1.0-smoothstep(.12,.5,d);gl_FragColor=vec4(mix(vColor,vec3(1.0),.18),a*.95);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,
    });
    this.geometries.push(geometry);
    this.materials.push(material);
    this.group.add(new three.Points(geometry, material));
    for (let ring = 0; ring < 3; ring++) {
      const points = Array.from({ length: 160 }, (_, i) => {
        const a = (i / 160) * Math.PI * 2;
        return new three.Vector3(
          Math.cos(a) * (2.5 + ring * 0.17),
          Math.sin(a) * (2.5 + ring * 0.17),
          0,
        );
      });
      const ringGeometry = new three.BufferGeometry().setFromPoints(points);
      const ringMaterial = new three.LineBasicMaterial({
        color: palette[ring],
        transparent: true,
        opacity: 0.2,
      });
      const line = new three.LineLoop(ringGeometry, ringMaterial);
      line.rotation.x = (ring - 1) * 0.25;
      this.geometries.push(ringGeometry);
      this.materials.push(ringMaterial);
      this.group.add(line);
    }
    this.motion = new MotionScope(
      this.host.nativeElement,
      () => {
        gsap.fromTo(
          this.scroll,
          { progress: 0 },
          {
            progress: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: this.host.nativeElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
        gsap.from(this.host.nativeElement.querySelectorAll('.eyebrow, h2, .field-description'), {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          scrollTrigger: { trigger: this.host.nativeElement, start: 'top 70%', once: true },
        });
      },
      this.paused(),
    );
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(this.viewport().nativeElement);
    this.resize();
    this.zone.run(() => this.ready.set(true));
    this.sync();
  }
  private resize = (): void => {
    if (this.destroyed || !this.renderer || !this.camera) return;
    const { width, height } = this.viewport().nativeElement.getBoundingClientRect();
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.render();
  };
  private render(): void {
    if (!this.renderer || !this.scene || !this.camera || !this.group || this.contextLost) return;
    this.group.rotation.set(
      0.95 + this.scroll.progress * 0.2,
      Math.sin(this.phase * 0.3) * 0.16,
      -0.4 + this.phase * 0.055 + this.scroll.progress * 0.25,
    );
    this.renderer.render(this.scene, this.camera);
  }
  private running(): boolean {
    return (
      !!this.renderer &&
      !this.destroyed &&
      !this.contextLost &&
      this.visible &&
      !document.hidden &&
      !this.media.matches &&
      !this.paused()
    );
  }
  private tick = (now: number): void => {
    this.frame = 0;
    if (!this.running()) return;
    this.phase += Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.render();
    this.frame = requestAnimationFrame(this.tick);
  };
  private sync = (): void => {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (this.destroyed) return;
    this.render();
    if (this.running()) {
      this.last = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    }
  };
  private onContextLost = (event: Event): void => {
    event.preventDefault();
    this.contextLost = true;
    this.sync();
    this.zone.run(() => this.ready.set(false));
  };
  ngOnDestroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.motion?.destroy();
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
    this.media.removeEventListener('change', this.sync);
    document.removeEventListener('visibilitychange', this.sync);
    this.canvas().nativeElement.removeEventListener('webglcontextlost', this.onContextLost);
    this.renderer?.setAnimationLoop(null);
    this.geometries.forEach((geometry) => geometry.dispose());
    this.materials.forEach((material) => material.dispose());
    this.scene?.clear();
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
    this.geometries = [];
    this.materials = [];
    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.group = undefined;
  }
}
