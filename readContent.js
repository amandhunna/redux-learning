
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("github", github);
// console.log("process", process.env);
console.log("--", process.env.super_secret);

async function run() {
  try {
    const message = `
    |index|fileName|base|current|
    |----|----|----|----|
    |1|/build/es2015-accountRoutes|24K|32K|
    |2|/build/es2015-orderDetails|316K|324K|
    |3|/build/es2015-paymentHistoryPage|128K|0||4|/build/es2015-refundListContainer|40K|72K|
`;
    const { context } = github;

/*  if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    } */

    const pull_request_number = context.payload.pull_request.number;
    const owner = context.actor
    const octokit = new github.getOctokit(process.env.super_secret);
    const repo = context.payload.repository.name;

    console.log("octakit working")
 
    const new_comment = await octokit.rest.issues.createComment({
        owner: owner,
        repo:  "redux-learning",
        issue_number: pull_request_number,
        body: message,
        ...context.repo,
      });
 
    console.log("-----new", new_comment);

  } catch (error) {
      console.log("Rerr", error);
    core.setFailed(error.message);
  }
}

run();