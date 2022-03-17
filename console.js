
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("---core----", core);
const x = github.context.payload.pull_request.labels
console.log("----github",Object.keys(x), x)