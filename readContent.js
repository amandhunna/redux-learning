
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("github", github);
// console.log("process", process.env);

async function run() {
  try {
    const message = "I am first comment"
    const github_token = core.getInput('super_secret');
    const github_token2 = core.getInput('GITHUB_TOKEN');
    console.log("token", github_token, github_token2)
    const { context } = github;

/*     if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    } */

    const pull_request_number = context.payload.pull_request.number;
    const owner = context.actor
    const octokit = new github.getOctokit(github_token);
    const repo = context.payload.repository.name;

    console.log("octakit working")
 
    const new_comment = await octokit.rest.issues.createComment({
        owner: context.actor,
        repo:  "redux-learning",
        issue_number: pull_request_number,
        body: message
      });
 
    console.log("-----new", new_comment);

  } catch (error) {
      console.log("Rerr", error);
    core.setFailed(error.message);
  }
}

run();