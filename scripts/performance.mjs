import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
const run = promisify(execFile);
const results = [];
for (const [name, path] of [
  ['ro-home', '/'],
  ['en-home', '/en/'],
  ['ro-contact', '/contact/'],
]) {
  const filename = `explore/validation/lighthouse-${name}.json`;
  await run(
    process.execPath,
    [
      'node_modules/lighthouse/cli/index.js',
      `http://localhost:4321${path}`,
      '--only-categories=performance',
      '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage',
      '--output=json',
      `--output-path=${filename}`,
      '--quiet',
    ],
    {
      env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH || '/usr/bin/google-chrome' },
      timeout: 90000,
    },
  );
  const r = JSON.parse(await readFile(filename, 'utf8'));
  const a = r.audits;
  const summary = {
    name,
    score: r.categories.performance.score,
    LCP: a['largest-contentful-paint'].numericValue,
    CLS: a['cumulative-layout-shift'].numericValue,
    FCP: a['first-contentful-paint'].numericValue,
    TBT: a['total-blocking-time'].numericValue,
    bytes: a['total-byte-weight'].numericValue,
    environment: r.environment,
    throttling: r.configSettings.throttling,
  };
  results.push(summary);
  console.log(JSON.stringify(summary));
}
await writeFile('explore/validation/performance-summary.json', JSON.stringify(results, null, 2));
