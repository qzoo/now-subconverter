const { exec } = require('child_process');
const path = require('path');

const subconverterPath = path.join(__dirname, 'subconverter.exe');

exec(subconverterPath, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
    console.error(stderr);
});
