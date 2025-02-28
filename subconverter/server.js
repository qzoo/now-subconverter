const { exec } = require('child_process');
const path = require('path');

const subconverterPath = path.join(__dirname, 'subconverter.exe');

// 启动 subconverter.exe
exec(subconverterPath, (err, stdout, stderr) => {
    if (err) {
        console.error('Failed to start subconverter:', err);
        return;
    }
    console.log('subconverter started:', stdout);
});

// 导出一个符合 Vercel 要求的函数
module.exports = (req, res) => {
    res.status(200).send('Subconverter is running!');
};
