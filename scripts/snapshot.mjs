import { createServer } from 'http';
import { readFile, mkdir } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

async function startServer() {
  const server = createServer(async (req, res) => {
    let pathname = decodeURIComponent(req.url.split('?')[0]);
    if (pathname === '/') pathname = '/index.html';
    const filepath = join(ROOT, pathname);
    try {
      const data = await readFile(filepath);
      const ct = MIME[extname(filepath)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': ct });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 900 },
];

async function captureFlow(page, baseUrl, outDir) {
  const wait = (ms) => page.waitForTimeout(ms);
  const shot = (name) =>
    page.screenshot({ path: join(outDir, `${name}.png`), fullPage: true });

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await wait(400);
  await shot('01-intro');

  await page.click('#btn-start');
  await wait(700);
  await shot('02-q1-location');

  await page.fill('#location-input', '역삼');
  await wait(300);
  await page.click('.suggestion-item');
  await wait(300);
  await page.click('#btn-location-confirm');
  await wait(700);
  await shot('03-q2-house-type');

  await page.click('#screen-q2 [data-value="apartment"]');
  await wait(900);
  await shot('04-q3-floor');

  await page.click('#screen-q3 [data-value="mid"]');
  await wait(900);
  await shot('05-q4-direction');

  await page.click('#screen-q4 [data-value="south"]');
  await wait(900);
  await shot('06-q5-companion');

  await page.click('#screen-q5 [data-value="family"]');
  await wait(300);
  await page.click('#btn-q5-next');
  await wait(6500);
  await shot('07-result');
}

async function main() {
  const label = process.argv[2] || 'before';
  const { server, url } = await startServer();
  console.log(`📸 캡처 라벨: ${label}`);
  console.log(`🌐 정적 서버: ${url}`);

  const browser = await chromium.launch();
  try {
    for (const vp of VIEWPORTS) {
      const outDir = join(ROOT, 'screenshots', label, vp.name);
      await mkdir(outDir, { recursive: true });
      console.log(`\n  [${vp.name}] ${vp.width}×${vp.height}`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      try {
        await captureFlow(page, url, outDir);
        console.log(`  ✓ 7장 캡처 → screenshots/${label}/${vp.name}/`);
      } catch (err) {
        console.error(`  ✗ ${vp.name} 실패:`, err.message);
        await page.screenshot({ path: join(outDir, '_error.png') }).catch(() => {});
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n✅ 완료: screenshots/${label}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
