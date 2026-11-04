const { spawn } = require('child_process');

function startTunnel() {
  console.log("Starting persistent localtunnel on port 5000 (hawkeye-backend-live)...");
  const isWin = process.platform === 'win32';
  const cmd = isWin ? 'npx.cmd' : 'npx';
  const child = spawn(cmd, ['localtunnel', '--port', '5000', '--subdomain', 'hawkeye-backend-live'], {
    stdio: 'inherit',
    shell: true
  });

  child.on('error', (err) => {
    console.error("Tunnel error:", err.message);
  });

  child.on('close', (code) => {
    console.log(`Tunnel disconnected (code ${code}). Auto-reconnecting in 2 seconds...`);
    setTimeout(startTunnel, 2000);
  });
}

startTunnel();

