// subconverter/shim.js
const { exec } = require('child_process');
const express = require('express');
const app = express();

// 启动 subconverter（使用环境变量端口）
const PORT = process.env.PORT || 25500; // 使用 Vercel 分配的动态端口
const converter = exec(`./subconverter --port=${PORT}`, { cwd: __dirname });

// 代理所有请求到 subconverter
app.all('*', (req, res) => {
  const url = req.originalUrl.replace('/sub/', '/'); // 移除路由前缀
  const proxy = exec(`./subconverter ${url}`, { cwd: __dirname }, (error, stdout) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.set('Content-Type', 'text/plain');
    res.send(stdout);
  });
});

// 处理退出信号
process.on('SIGTERM', () => {
  converter.kill();
  process.exit(0)
