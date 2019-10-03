const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')
const http = require('http');
const fs = require('fs');
const url = require('url');
const spawn = require('child_process').spawn;

var file_url = "https://detect.synopsys.com/detect.sh"
var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(file_name);
var curl = spawn('curl', [file_url]);
curl.stdout.on('data', function(data) { file.write(data); });
curl.stdout.on('end', function(data) {
  file.end();
  console.log(file_name + ' downloaded');
  fs.chmodSync('detect.sh', '777');
  shell.exec('./detect.sh')
});
curl.on('exit', function(code) {
  if (code != 0) {
    console.log('Failed to download detect: ' + code);
  }
});
