const { spawn } = require('child_process');
const path = require('path');

const subconverterPath = path.join(__dirname, 'subconverter.exe');

module.exports = (req, res) => {
    const target = req.query.target || 'clash';
    const urlParam = req.query.url;

    if (!urlParam) {
        res.status(400).send('Missing "url" parameter');
        return;
    }

    const args = [`--target=${target}`, `--url=${urlParam}`];
    const subconverterProcess = spawn(subconverterPath, args, {
        stdio: 'pipe',
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

        res.status(200).send(output);
    });

    subconverterProcess.on('error', (err) => {
        console.error('Failed to start subconverter:', err);
        res.status(500).send('Internal Server Error');
    });
};
