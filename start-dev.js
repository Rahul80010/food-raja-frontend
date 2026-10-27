import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(__dirname, '..', 'backend');
const backendServer = path.join(backendDir, 'server.js');

function checkBackendHealth() {
  return new Promise((resolve) => {
    const req = http.get('http://127.0.0.1:5000/api/health', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(800, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function start() {
  const isRunning = await checkBackendHealth();

  if (!isRunning) {
    console.log('\x1b[33m%s\x1b[0m', '\n[FoodRaja] Backend server on port 5000 is not running.');
    console.log('\x1b[32m%s\x1b[0m', '[FoodRaja] Auto-launching Backend API Server (Node.js Express)...');
    
    const backendProcess = spawn('node', ['server.js'], {
      cwd: backendDir,
      stdio: 'inherit',
      shell: true
    });

    backendProcess.on('error', (err) => {
      console.error('[FoodRaja] Error starting backend:', err);
    });

    // Give backend 2 seconds to initialize
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } else {
    console.log('\x1b[32m%s\x1b[0m', '\n[FoodRaja] Backend API server is active on http://127.0.0.1:5000');
  }

  // Start Vite
  console.log('\x1b[36m%s\x1b[0m', '[FoodRaja] Launching Customer Frontend on http://localhost:5173...\n');
  const vite = spawn('npx', ['vite'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  vite.on('close', (code) => {
    process.exit(code || 0);
  });
}

start();
