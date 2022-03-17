
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("---core----", core);
const { labels } = github.context.payload.pull_request
console.log("----github",Object.values(labels))

const requiredLabel = labels.filter(item => item.name === "web");
console.log("label name, -----",requiredLabel[0].name)