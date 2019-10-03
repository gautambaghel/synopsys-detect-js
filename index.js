const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')
shell.exec('./entrypoint.sh')
