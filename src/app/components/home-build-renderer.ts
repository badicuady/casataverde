import { Language } from '../data/content';

export const BUILD_DURATION = 7000;
type Point = [number, number];
type Vertex = [number, number, number?];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const phase = (time: number, start: number, duration: number) => clamp((time - start) / duration);
const ease = (value: number) => value * value * (3 - 2 * value);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** One shared footprint drives the survey, extrusion and envelope. The final projection
 * aligns with the generated architectural cutout (1672 × 941), avoiding unrelated frames. */
export function drawHomeBuild(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  home: HTMLImageElement | null,
  language: Language,
): void {
  ctx.clearRect(0, 0, width, height);
  const scale = Math.min(width / 1800, height / 1000);
  ctx.save();
  ctx.translate((width - 1800 * scale) / 2, (height - 1000 * scale) / 2);
  ctx.scale(scale, scale);
  const tilt = ease(phase(time, 1500, 1400));
  const walls = ease(phase(time, 2250, 1500));
  const roof = ease(phase(time, 3650, 1000));
  const reveal = ease(phase(time, 5050, 1550));
  const ink = '#c6f47a';
  const project = ([x, z, y = 0]: Vertex): Point => [
    mix(452 + x * 72, 64 + 491 + x * 74.3 - z * 34.2, tilt),
    mix(768 - z * 72, 753 - x * 15.3 - z * 21.6 - y * 70, tilt),
  ];
  const line = (points: Point[], color: string, thickness = 1.4, progress = 1) => {
    if (progress <= 0) return;
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    const lengths = points
      .slice(1)
      .map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
    let remaining = lengths.reduce((a, b) => a + b, 0) * clamp(progress);
    for (let i = 0; i < lengths.length && remaining > 0; i++) {
      const t = Math.min(1, remaining / lengths[i]);
      ctx.lineTo(mix(points[i][0], points[i + 1][0], t), mix(points[i][1], points[i + 1][1], t));
      remaining -= lengths[i];
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';
    ctx.stroke();
  };
  const path = (vertices: Vertex[], color = ink, thickness = 1.6, progress = 1) =>
    line(vertices.map(project), color, thickness, progress);
  const polygon = (vertices: Vertex[], fill: string, stroke = ink) => {
    ctx.beginPath();
    vertices.forEach((v, i) => {
      const p = project(v);
      i ? ctx.lineTo(...p) : ctx.moveTo(...p);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  };
  const label = (value: string, point: Point, size = 20, color = '#a4afa7', angle = 0) => {
    ctx.save();
    ctx.translate(...point);
    ctx.rotate(angle);
    ctx.font = `400 ${Math.max(size, 9 / scale)}px Manrope, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value, 0, 0);
    ctx.restore();
  };

  // A quiet reference grid remains beneath the finished model.
  ctx.save();
  ctx.globalAlpha = mix(0.23, 0.13, reveal);
  for (let x = -3; x <= 16; x++)
    path(
      [
        [x, -3],
        [x, 11],
      ],
      '#607c66',
      0.85,
    );
  for (let z = -3; z <= 11; z++)
    path(
      [
        [-3, z],
        [16, z],
      ],
      '#607c66',
      0.85,
    );
  ctx.restore();

  const dimensions = (opacity: number) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    for (const [a, b] of [
      [
        [0, -2.5],
        [12, -2.5],
      ],
      [
        [-2.6, 0],
        [-2.6, 8],
      ],
    ] as [Vertex, Vertex][]) {
      const p = project(a),
        q = project(b);
      if (a[0] !== b[0]) {
        p[0] = mix(p[0], 640, tilt);
        p[1] = mix(p[1], 955, tilt);
        q[0] = mix(q[0], 1730, tilt);
        q[1] = mix(q[1], 720, tilt);
      }
      line([p, q], '#a4afa7', 1.1);
      for (const point of [p, q]) {
        line(
          [
            [point[0] - 6, point[1] - 7],
            [point[0] + 6, point[1] + 7],
          ],
          '#a4afa7',
          1.1,
        );
      }
      const center: Point = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + 22];
      let angle = Math.atan2(q[1] - p[1], q[0] - p[0]);
      if (angle < -Math.PI / 2) angle += Math.PI;
      label(a[0] === b[0] ? '8.00 m' : '12.00 m', center, 19, '#a4afa7', angle);
    }
    path(
      [
        [0, 0],
        [0, -2.8],
      ],
      '#75877c',
      1,
    );
    path(
      [
        [12, 0],
        [12, -2.8],
      ],
      '#75877c',
      1,
    );
    path(
      [
        [0, 0],
        [-2.9, 0],
      ],
      '#75877c',
      1,
    );
    path(
      [
        [0, 8],
        [-2.9, 8],
      ],
      '#75877c',
      1,
    );
    ctx.restore();
  };
  dimensions(ease(phase(time, 400, 500)) * 0.8);

  // Wipe the same aligned geometry away as finished materials pass across it.
  ctx.save();
  if (home && reveal > 0) {
    ctx.beginPath();
    ctx.rect(30 + reveal * 1740, 0, 1800, 1000);
    ctx.clip();
  }
  const floor: Vertex[] = [
    [0, 0],
    [12, 0],
    [12, 8],
    [0, 8],
    [0, 0],
  ];
  path(floor, ink, 3, phase(time, 0, 600));
  path(
    [
      [0.18, 0.18],
      [11.82, 0.18],
      [11.82, 7.82],
      [0.18, 7.82],
      [0.18, 0.18],
    ],
    '#82ad6e',
    1,
    phase(time, 170, 650),
  );
  const partitions: Vertex[][] = [
    [
      [4.4, 0.18],
      [4.4, 2.2],
    ],
    [
      [4.4, 3.2],
      [4.4, 7.82],
    ],
    [
      [0.18, 4.6],
      [2.9, 4.6],
    ],
    [
      [3.8, 4.6],
      [7.8, 4.6],
    ],
    [
      [7.8, 4.6],
      [7.8, 5.8],
    ],
    [
      [7.8, 6.7],
      [7.8, 7.82],
    ],
  ];
  ctx.save();
  ctx.globalAlpha = 1 - walls * 0.8;
  partitions.forEach((vertices, i) =>
    path(vertices, '#aed493', 2.5, phase(time, 350 + i * 65, 430)),
  );
  // Door leaves and swing arcs establish the drawing as a releveu, not a generic grid.
  for (const [x, z, rotation] of [
    [4.4, 2.2, 0],
    [2.9, 4.6, Math.PI / 2],
    [7.8, 5.8, 0],
  ]) {
    const swing: Vertex[] = [];
    for (let i = 0; i <= 20; i++) {
      const angle = rotation + ((i / 20) * Math.PI) / 2;
      swing.push([x + Math.cos(angle), z + Math.sin(angle)]);
    }
    path(swing, '#82ad6e', 1, phase(time, 800, 400));
    path([[x, z], swing[0]], '#82ad6e', 1, phase(time, 800, 400));
  }
  if (tilt < 0.75) {
    ctx.globalAlpha = ease(phase(time, 800, 400)) * (1 - tilt / 0.75);
    const rooms =
      language === 'ro'
        ? ['DORMITOR', 'BIROU', 'LIVING', 'BUCĂTĂRIE']
        : ['BEDROOM', 'STUDY', 'LIVING', 'KITCHEN'];
    [
      [2.2, 2.4],
      [2.2, 6.2],
      [8.2, 2.4],
      [9.8, 6.2],
    ].forEach(([x, z], i) => label(rooms[i], project([x, z]), 17, '#a4afa7'));
  }
  ctx.restore();

  if (walls > 0) {
    const h = walls * 3;
    polygon(
      [
        [0, 8],
        [12, 8],
        [12, 8, h],
        [0, 8, h],
      ],
      '#182d22',
      '#608d60',
    );
    polygon(
      [
        [12, 0],
        [12, 8],
        [12, 8, h],
        [12, 0, h],
      ],
      '#14291f',
      '#608d60',
    );
    partitions.forEach((vertices) => {
      const [a, b] = vertices;
      polygon([a, b, [b[0], b[1], h * 0.88], [a[0], a[1], h * 0.88]], '#1d3527', '#7aab6b');
    });
    polygon(
      [
        [0, 0],
        [0, 8],
        [0, 8, h],
        [0, 0, h],
      ],
      '#263d2c',
    );
    polygon(
      [
        [0, 0],
        [12, 0],
        [12, 0, h],
        [0, 0, h],
      ],
      '#304c34',
    );
    // Facade openings retain their physical positions throughout the extrusion.
    for (const [left, right, bottom, top] of [
      [0.85, 2.8, 0.1, 2.35],
      [4.15, 6.9, 0, 2.55],
      [7.55, 11.1, 0.1, 2.4],
    ]) {
      polygon(
        [
          [left, 0, bottom * walls],
          [right, 0, bottom * walls],
          [right, 0, top * walls],
          [left, 0, top * walls],
        ],
        '#11241c',
        '#95bd7e',
      );
      if (left > 7)
        path(
          [
            [9.3, 0, bottom * walls],
            [9.3, 0, top * walls],
          ],
          '#95bd7e',
        );
    }
    polygon(
      [
        [0, 1.3, 0.8 * walls],
        [0, 3.4, 0.8 * walls],
        [0, 3.4, 1.7 * walls],
        [0, 1.3, 1.7 * walls],
      ],
      '#11241c',
      '#95bd7e',
    );
    polygon(
      [
        [0, 6.3, 0.2 * walls],
        [0, 6.9, 0.2 * walls],
        [0, 6.9, 2.4 * walls],
        [0, 6.3, 2.4 * walls],
      ],
      '#11241c',
      '#95bd7e',
    );
  }
  if (roof > 0) {
    const ridge = 3 + roof * 2;
    polygon(
      [
        [0, 0, 3],
        [0, 8, 3],
        [0, 4, ridge],
      ],
      '#263d2c',
    );
    polygon(
      [
        [0, 4, ridge],
        [12, 4, ridge],
        [12.15, -0.25, 3],
        [-0.15, -0.25, 3],
      ],
      '#14271e',
    );
    for (let x = 0; x <= 12; x += 0.4)
      path(
        [
          [x, -0.25, 3],
          [x, 4, ridge],
        ],
        '#527349',
        0.8,
      );
    path(
      [
        [-0.15, -0.25, 3],
        [12.15, -0.25, 3],
      ],
      ink,
      3,
    );
    const panel = phase(time, 4300, 600);
    if (panel > 0) {
      ctx.save();
      ctx.globalAlpha = panel;
      for (const x of [7.25, 8.85, 10.45]) {
        polygon(
          [
            [x, 0.55, 3.4],
            [x + 1.05, 0.55, 3.4],
            [x + 1.05, 3.25, 4.72],
            [x, 3.25, 4.72],
          ],
          '#203b32',
          '#8eb6af',
        );
        for (let z = 1; z < 3.2; z += 0.45)
          path(
            [
              [x, z, 3.13 + z * 0.49],
              [x + 1.05, z, 3.13 + z * 0.49],
            ],
            '#628c81',
            0.6,
          );
      }
      ctx.restore();
    }
  }
  ctx.restore();

  if (home && reveal > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 30 + reveal * 1740, 1000);
    ctx.clip();
    ctx.drawImage(home, 64, 0, 1672, 941);
    ctx.restore();
  }
  // A fine scanning edge moves quickly through the drawing and material reveal.
  const surveyScan = phase(time, 100, 1150);
  if (surveyScan > 0 && surveyScan < 1) {
    const x = surveyScan * 12;
    ctx.save();
    ctx.globalAlpha = Math.sin(surveyScan * Math.PI) * 0.6;
    path(
      [
        [x, -0.3],
        [x, 8.3],
      ],
      '#edf3e9',
      1.2,
    );
    ctx.restore();
  }
  if (reveal > 0 && reveal < 1) {
    ctx.save();
    ctx.globalAlpha = Math.sin(reveal * Math.PI) * 0.6;
    const x = 30 + reveal * 1740;
    line(
      [
        [x, 100],
        [x, 860],
      ],
      ink,
      1.5,
    );
    ctx.restore();
  }
  ctx.restore();
}
