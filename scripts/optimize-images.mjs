import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('public/images', { recursive: true });
for (const name of ['forest-residence', 'quiet-interior']) {
  for (const width of [640, 960, 1440]) {
    for (const format of ['avif', 'webp']) {
      await sharp(`assets/source/${name}.png`)
        .resize({ width })
        .toFormat(format, { quality: format === 'avif' ? 52 : 78 })
        .toFile(`public/images/${name}-${width}.${format}`);
    }
  }
}
await mkdir('public/fonts', { recursive: true });
for (const subset of ['latin', 'latin-ext']) {
  await copyFile(
    `node_modules/@fontsource-variable/manrope/files/manrope-${subset}-wght-normal.woff2`,
    `public/fonts/manrope-${subset}.woff2`,
  );
}
await copyFile('node_modules/@fontsource-variable/manrope/LICENSE', 'public/fonts/OFL.txt');
