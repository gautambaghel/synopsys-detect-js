const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')
const IS_WINDOWS = process.platform === 'win32';

const detectArgs = core.getInput('detectArgs');
if (IS_WINDOWS) {
    // On windows use the POWERSHELL SCRIPT
    shell.exec("wget https://detect.synopsys.com/detect.ps1")
    shell.exec("powershell \"[Net.ServicePointManager]::SecurityProtocol = 'tls12'; irm detect.ps1?$(Get-Random) | iex; detect\"")
  } else {
    // On everything else do bash
    shell.exec("wget https://detect.synopsys.com/detect.sh")
    shell.exec("chmod +x detect.sh")
    console.log(`The event payload: ${detectArgs}`)
    shell.exec("./detect.sh ${{detectArgs}}")
}
