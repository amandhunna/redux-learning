
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("github", github);
// console.log("process", process.env);

async function run() {
  try {
    const message = "I am first comment"
    const github_token = core.getInput('TOKEN');

    const { context } = github;

/*     if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    } */

    const pull_request_number = context.payload.pull_request.number;
    const octokit = new github.getOctokit("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");
    console.log("----",
    Object.keys(octokit));
    
    console.log("====", context.payload.repository.name)
    const new_comment = await octokit.rest.issues.createComment({
        owner: context.actor,
        repo:  "redux-learning",
        issue_number: pull_request_number,
        body: message
      });
    console.log("-----new", new_comment);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();