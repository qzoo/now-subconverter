const { spawn } = require('child_process');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const subconverterPath = path.join(__dirname, 'subconverter.exe');

// 导出一个符合 Vercel 要求的函数
module.exports = (req, res) => {
    // 解析请求的 URL 和查询参数
    const parsedUrl = url.parse(req.url);
    const queryParams = querystring.parse(parsedUrl.query);

    // 提取 target 和 url 参数
    const target = queryParams.target || 'clash'; // 默认值为 'clash'
    const urlParam = queryParams.url; // 必须提供 url 参数

    if (!urlParam) {
        res.status(400).send('Missing "url" parameter');
        return;
    }

    // 构建 subconverter.exe 的命令行参数
    const args = [`--target=${target}`, `--url=${urlParam}`];

    // 使用 spawn 启动 subconverter.exe
    const subconverterProcess = spawn(subconverterPath, args, {
        stdio: 'pipe', // 捕获子进程的输出
    });

    let output = '';
    let errorOutput = '';

    subconverterProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    subconverterProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    subconverterProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`subconverter.exe failed with code ${code}: ${errorOutput}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        // 返回 subconverter.exe 的输出
        res.status(200).send(output);
    });

    subconverterProcess.on('error', (err) => {
        console.error('Failed to start subconverter:', err);
        res.status(500).send('Internal Server Error');
    });
};
