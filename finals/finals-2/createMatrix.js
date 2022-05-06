const fs = require("fs");
const core = require("@actions/core");
const github = require("@actions/github");

const D_WEB = "portal-dweb";
const M_WEB = "portal-mweb";

async function createMatrix() {
    core.info(`BOT_AUTH_TOKEN env :: ${process.env.BOT_AUTH_TOKEN}`);
    try {
        const { context } = github;
        const pull_request_number = context.payload.pull_request.number;
        const owner = context.actor;
        const repo = context.payload.repository.name;

        // init octokit
        const token = process.env.BOT_AUTH_TOKEN;
        const octokit = new github.getOctokit(token);

        const updatedIssueInformation = await octokit.rest.issues.get({
            owner: owner,
            repo: repo,
            issue_number: pull_request_number,
            ...context.repo,
        });

        const labels = updatedIssueInformation.data.labels.map(label => label.name);

        const existingLabels = `Existing labels labels are ${JSON.stringify(labels)}.`;
        core.info(existingLabels);

        const labelsToAdd = [M_WEB];

        for (let labelToAdd of labelsToAdd) {
            if (!labels.includes(labelToAdd)) {
                labels.push(labelToAdd);
            }
        }

        const updatedLabels = `Updated labels are ${JSON.stringify(labels)}.`;
        core.info(updatedLabels);

        // await octokit.rest.issues.update({
        // owner: owner,
        // repo: repo,
        // issue_number: pull_request_number,
        // labels: labels,
        // ...context.repo,
        // });

        const matrix = [M_WEB];
        if (labels.includes(D_WEB)) {
            matrix.push(D_WEB);
        }

        const template = JSON.stringify({ label: matrix });

        fs.writeFile("matrix.txt", template, function(error) {
            if (error) return core.setFailed(`error in creating file:::  ${error}`);
            core.info("File created successfully");
        });

        return null;
    } catch (error) {
        core.setFailed(`Add label action failed with error::: ${error}`);
    }
}

createMatrix();