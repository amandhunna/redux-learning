
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

      const updatedIssueInformation = await octokit.rest.issues.get({
        owner: owner,
        repo: repo,
        issue_number: pull_request_number
      });

      const labels = updatedIssueInformation.data.labels.map(label => label.name);
      
      const existingLabels = `Existing labels labels are ${JSON.stringify(labels)}.`;
      core.info(existingLabels);
    

      const labelsToAdd = ["web", "bug"];

      for (let labelToAdd of labelsToAdd) {
        if (!labels.includes(labelToAdd)) {
          labels.push(labelToAdd);
        }
      }
k
      await octokit.rest.issues.update({
        owner: owner,
        repo: repo,
        issue_number: pull_request_number,
        labels: labels
      });
      
      const updatedLabels = `Updated labels are ${JSON.stringify(labels)}.`;
      core.info(updatedLabels);


      return null
  } catch (error) {
      core.setFailed(`Add label action failed with error::: ${error}`);
  }
}

addLabel();