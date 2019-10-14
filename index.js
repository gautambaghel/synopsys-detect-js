const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')
const IS_WINDOWS = process.platform === 'win32'

let myOutput = ''
let myError = ''

const options = {}
options.listeners = {
  stdout: (data: Buffer) => {
    myOutput += data.toString()
  },
  stderr: (data: Buffer) => {
    myError += data.toString()
  }
}
options.cwd = './lib'

const detectArgs = core.getInput('args')
var returnCode = 0
if (IS_WINDOWS) {
    // On windows use the POWERSHELL SCRIPT
    await exec.exec(`powershell "[Net.ServicePointManager]::SecurityProtocol = 'tls12'; irm https://detect.synopsys.com/detect.ps1?$(Get-Random) | iex; detect ${detectArgs}"`, options)
    // returnCode = shell.exec(`powershell "[Net.ServicePointManager]::SecurityProtocol = 'tls12'; irm https://detect.synopsys.com/detect.ps1?$(Get-Random) | iex; detect ${detectArgs}"`).code
  } else {
    // On everything else do bash
    await exec.exec("wget https://detect.synopsys.com/detect.sh && chmod +x detect.sh")
    await exec.exec(`./detect.sh ${detectArgs}`, options)
    //shell.exec("wget https://detect.synopsys.com/detect.sh")
    //shell.exec("chmod +x detect.sh")
    // returnCode = shell.exec(`./detect.sh ${detectArgs}`).code
}

if (returnCode == 3) {
    core.warning(`Project contains policy violations`)
    return
    // will be added in @actions/core v2
    // core.setNeutral(`Project contains policy violations`)
}

if (returnCode != 0) {
    core.setFailed(`Synopsys Detect failed with error ${returnCode}`)
}

core.warning(myOutput)
core.warning(myError)
