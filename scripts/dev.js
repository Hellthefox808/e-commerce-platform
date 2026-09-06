const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\x1b[35m%s\x1b[0m', '═══════════════════════════════════════════════════');
console.log('\x1b[35m%s\x1b[0m', '   LUXE-COMMERCE — FULL-STACK DEVELOPMENT RUNNER    ');
console.log('\x1b[35m%s\x1b[0m', '═══════════════════════════════════════════════════\n');

const cmd = isWindows ? 'cmd.exe' : 'npm';
const backendArgs = isWindows ? ['/c', 'npm', 'run', 'dev'] : ['run', 'dev'];
const frontendArgs = isWindows ? ['/c', 'npm', 'run', 'dev'] : ['run', 'dev'];

// 1. Start Backend Server
const backend = spawn(cmd, backendArgs, {
  cwd: path.join(rootDir, 'backend'),
  stdio: 'pipe'
});

backend.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((l) => console.log('\x1b[36m[BACKEND]\x1b[0m', l));
});

backend.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((l) => console.error('\x1b[31m[BACKEND-ERR]\x1b[0m', l));
});

// 2. Start Frontend Vite Server
const frontend = spawn(cmd, frontendArgs, {
  cwd: path.join(rootDir, 'frontend'),
  stdio: 'pipe'
});



frontend.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((l) => console.log('\x1b[32m[FRONTEND]\x1b[0m', l));
});

frontend.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((l) => console.error('\x1b[33m[FRONTEND-ERR]\x1b[0m', l));
});

const cleanup = () => {
  console.log('\n\x1b[35mShutting down all development processes...\x1b[0m');
  try {
    if (isWindows) {
      spawn('taskkill', ['/pid', backend.pid, '/f', '/t']);
      spawn('taskkill', ['/pid', frontend.pid, '/f', '/t']);
    } else {
      backend.kill();
      frontend.kill();
    }
  } catch (e) {
    // Ignore cleanup errors
  }
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
