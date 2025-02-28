const { exec } = require('child_process');
module.exports = async (req, res) => {
  const converter = exec('./subconverter', (error) => {
    if (error) throw error;
  });
  converter.stdout.pipe(res);
};
