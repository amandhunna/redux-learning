
const core = require('@actions/core');
const github = require('@actions/github');

console.log("---core----");
console.log("----github", github.event.pull_request.labels)