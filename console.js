
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("---core----", core);
const x = github.context.payload.pull_request
console.log("pre", x)
console.log("----github",Object.keys(x), x.labels)