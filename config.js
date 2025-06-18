const os = require('os');

const isWindows = os.platform() === 'win32';

const venomConfig = {
  session: 'whatsapp-ia',
  headless: isWindows ? false : true,
  useChrome: true,
  browserPathExecutable: isWindows ? undefined : '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

module.exports = { venomConfig };
