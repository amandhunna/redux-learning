
const core = require('@actions/core');
const github = require('@actions/github');

console.log( "super_secret==", process.env.super_secret);

async function addLabel() {
  try {
      const { context } = github;
      const pull_request_number = context.payload.pull_request.number;
      const owner = context.actor;
      const repo = context.payload.repository.name;
      
      // init octokit
      const token =  process.env.super_secret
      const octokit = new github.getOctokit(token);

      console.log("----octokit", octokit);

      const updatedIssueInformation = await octokit.issues.get({
        owner: owner,
        repo: repo,
        issue_number: pull_request_number
      });

      console.log("===updatedIssueInformation==", JSON.stringify(updatedIssueInformation));
    
      const labels = updatedIssueInformation.data.labels.map(label => label.name);
      
      console.log("=labels====", JSON.stringify(labels));

      const labelsToAdd = ["web", "bug"];

      for (let labelToAdd of labelsToAdd) {
        if (!labels.includes(labelToAdd)) {
          labels.push(labelToAdd);
        }
      }

      await octokit.issues.update({
        owner: ownerName,
        repo: repoName,
        issue_number: issueNumber,
        labels: labels
      });

      return `Updated labels in ${JSON.stringify(labels)}.`;
  } catch (error) {
      core.setFailed(`comment action failed with error::: ${error}`);
  }
}

addLabel();