const os = require('os');
const crypto = require('crypto');
const { machineIdSync } = require('node-machine-id');
const { execSync } = require('child_process');

function getExtraHardwareInfo() {
  try {
    if (process.platform === 'win32') {
      return execSync('wmic diskdrive get serialnumber').toString().trim();
    } else if (process.platform === 'linux') {
      return execSync('sudo hdparm -I /dev/sda | grep "Serial Number"').toString().trim();
    } else if (process.platform === 'darwin') {
      return execSync('system_profiler SPHardwareDataType | grep "Serial"').toString().trim();
    }
  } catch {
    return '';
  }
}

function generateStableDeviceId() {
  const parts = [];

  // Machine ID
  try { parts.push(machineIdSync({ original: true })); } catch {}

  // Hostname, platform, arch
  parts.push(os.hostname(), os.platform(), os.arch());

  // Username
  try { parts.push(os.userInfo().username); } catch {}

  // CPU Model and Count
  const cpus = os.cpus();
  if (cpus && cpus.length) parts.push(cpus[0].model, cpus.length.toString());

  // Total memory
  parts.push(String(os.totalmem()));

  // Disk serial (optional)
  const diskSerial = getExtraHardwareInfo();
  if (diskSerial) parts.push(diskSerial);

  // Hash everything
  const raw = parts.filter(Boolean).join('|');
//   return crypto.createHash('sha256').update(raw).digest('hex');
    return raw;
}

console.log('Stable Device ID:', generateStableDeviceId());
