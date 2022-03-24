
const core = require('@actions/core');
const github = require('@actions/github');

console.log("---env----", process.env);

console.log('core-----------', core);
console.log("======github=", github);
const { labels } = github.context.payload.pull_request
console.log("----github",Object.values(labels))

const requiredLabel = labels.filter(item => item.name === "web");
console.log("label name, -----",requiredLabel[0].name)