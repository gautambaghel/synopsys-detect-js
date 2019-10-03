const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')

shell.exec("wget https://detect.synopsys.com/detect.sh")
shell.exec("chmod +x detect.sh")
shell.exec("./detect.sh")
