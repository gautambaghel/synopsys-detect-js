const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')
const IS_WINDOWS = process.platform === 'win32';

const detectArgs = core.getInput('args');
var returnCode = 0
if (IS_WINDOWS) {
    // On windows use the POWERSHELL SCRIPT
    returnCode = shell.exec(`powershell "[Net.ServicePointManager]::SecurityProtocol = 'tls12'; irm https://detect.synopsys.com/detect.ps1?$(Get-Random) | iex; detect ${detectArgs}"`).code
  } else {
    // On everything else do bash
    shell.exec("wget https://detect.synopsys.com/detect.sh")
    shell.exec("chmod +x detect.sh")
    returnCode = shell.exec(`./detect.sh ${detectArgs}`).code
}

if (returnCode == 3) {
    core.warning(`Project contains policy violations`);
    core.setNeutral(`Project contains policy violations`)
}

if (returnCode != 0 || returnCode != 3) {
    core.setNeutral(`Synopsys Detect failed with error ${returnCode}`)
}
