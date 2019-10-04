const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')
const IS_WINDOWS = process.platform === 'win32';

const detectArgs = core.getInput('args');
if (IS_WINDOWS) {
    // On windows use the POWERSHELL SCRIPT
    shell.exec(`powershell "[Net.ServicePointManager]::SecurityProtocol = 'tls12'; irm https://detect.synopsys.com/detect.ps1?$(Get-Random) | iex; detect ${detectArgs}"`)
  } else {
    // On everything else do bash
    shell.exec("wget https://detect.synopsys.com/detect.sh")
    shell.exec("chmod +x detect.sh")
    shell.exec(`./detect.sh ${detectArgs}`)
}
