
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("github", github);
// console.log("process", process.env);

const github_token = core.getInput('super_secret');
const github_token2 = core.getInput('GITHUB_TOKEN');
const message2 = core.getInput('message');

// console.log("message", message2);
// console.log("token", github_token, github_token2)
console.log("--", process.env);
// console.log( "super_secret==", process.env.super_secret);


async function run() {
  try {
    const message = `
    <table>
        <th>1</th>
        <th>2</th>
        <td>we</td>
        <td>67</td>
    </table> `;
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
        body: message
      });
 
    console.log("-----new", new_comment);

  } catch (error) {
      console.log("Rerr", error);
    core.setFailed(error.message);
  }
}

//run();