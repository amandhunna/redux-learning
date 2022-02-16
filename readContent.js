
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
    const owner = context.actor
    const octokit = new github.getOctokit("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");
    const repo = context.payload.repository.name;

    console.log("octakit working")
/* 
    const new_comment = await octokit.rest.issues.createComment({
        owner: context.actor,
        repo:  "redux-learning",
        issue_number: pull_request_number,
        body: message
      });
 */
      const new_comment =  await octokit.request('GET repos/amandhunna/redux-learning/issues')
 /*      const new_comment = await octokit.request(`POST /${owner}/${repo}/pull/${pull_request_number}/comments`, {
        owner: owner,
        repo: repo,
        issue_number: pull_request_number,
        body: 'body'
      });
 */
    console.log("-----new", new_comment);

  } catch (error) {
      console.log("Rerr", error);
    core.setFailed(error.message);
  }
}

run();