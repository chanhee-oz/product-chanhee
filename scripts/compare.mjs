// 로컬 서버 띄우고 비교 페이지를 브라우저에서 자동으로 열기
// 사용법: npm run compare

import { createServer } from 'http';
import { readFile, access } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SHOTS = join(ROOT, 'screenshots');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown; charset=utf-8',
};

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

const server = createServer(async (req, res) => {
  let pathname = decodeURIComponent(req.url.split('?')[0]);
  if (pathname === '/') pathname = '/comparison.html';
  const filepath = join(SHOTS, pathname);
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

const PORT = 4173;

async function main() {
  const html = join(SHOTS, 'comparison.html');
  if (!(await exists(html))) {
    console.error('❌ comparison.html이 없어요. 먼저 npm run snapshot:diff 실행하세요.');
    process.exit(1);
  }

  server.listen(PORT, '127.0.0.1', () => {
    const url = `http://127.0.0.1:${PORT}/`;
    console.log(`\n🌐 비교 페이지가 열렸어요: ${url}`);
    console.log(`   끄고 싶으면 이 터미널에서 Ctrl+C`);

    // OS별 브라우저 자동 오픈
    const cmd = process.platform === 'win32' ? `start "" "${url}"`
              : process.platform === 'darwin' ? `open "${url}"`
              : `xdg-open "${url}"`;
    exec(cmd, (err) => {
      if (err) {
        console.log(`   브라우저 자동 오픈 실패. 위 URL을 직접 복사해서 열어주세요.`);
      }
    });
  });
}

main().catch(err => { console.error(err); process.exit(1); });
