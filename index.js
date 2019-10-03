const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')
const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream("detect.sh");
const request = http.get("http://detect.synopsys.com/detect.sh", function(response) {
  response.pipe(file);
  fs.chmodSync('detect.sh', '777');
  shell.exec('./detect.sh')
});
