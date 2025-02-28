// 文件路径: subconverter.js
const { exec } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 25500;
const binPath = path.join(__dirname, 'subconverter', 'subconverter.exe');

// 启动二进制并保持进程
const child = exec(`"${binPath}" -p=${PORT}`, (err) => {
  if (err) process.exit(1);
});

// 关闭时清理进程
process.on('SIGTERM', () => child.kill());
