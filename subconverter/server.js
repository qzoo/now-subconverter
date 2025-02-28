const { spawn } = require('child_process');
const path = require('path');

const subconverterPath = path.join(__dirname, 'subconverter.exe');

// 使用 spawn 启动 subconverter.exe
const subconverterProcess = spawn(subconverterPath, [], {
    stdio: 'inherit', // 将子进程的输出直接连接到父进程
    detached: true,   // 让子进程在后台运行
});

subconverterProcess.on('error', (err) => {
    console.error('Failed to start subconverter:', err);
});

subconverterProcess.on('exit', (code, signal) => {
    console.log(`subconverter exited with code ${code} and signal ${signal}`);
});

// 导出一个符合 Vercel 要求的函数
module.exports = (req, res) => {
    res.status(200).send('Subconverter is running!');
};
