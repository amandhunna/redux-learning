
const core = require('@actions/core');
const github = require('@actions/github');

// console.log("github", github);
// console.log("process", process.env);
console.log("--", process.env.super_secret);

const myJSON = {
  "/build/es2015-accountRoutes": { base: "24K", current: "32K" },
  "/build/es2015-orderDetails": { base: "316K", current: "324K" },
  "/build/es2015-paymentHistoryPage": { base: "128K", current: 0 },
  "/build/es2015-refundListContainer": { base: "40K", current: "72K" },
  "/build/es2015-reviews": { base: "112K", current: "108K" },
  "/build/es2015-support": { base: "224K", current: "232K" },
  "/build/es2015-supportIssuesPage": { base: "148K", current: "188K" },
  "/build/es2015-tracking": { base: "560K", current: "564K" },
  "/build/es2015-vendor": { base: "1.7M", current: "1.8M" },
  "/build/es2015-vendors-bui~PaymentHistory": { base: "36K", current: "64K" },
  "/build/es2015-vendors-search": { base: "92K", current: "100K" },
  "/build/es2015-web-payments": { base: "980K", current: "992K" },
  total: { base: "53M", current: "54M" }
};

function mdString(myJSON) {
  const conversionArr = Object.entries(myJSON).map(([key, values], index) => ({"Sno." :index+ 1, fileName: key, ...values }));
  const initial =
  "Sno | FileName | Base |Current \n------------ | -------------\n";

const mdString = conversionArr.reduce((acc, curr) => {
  console.log(curr);
  const row =
    curr.Sno +
    1 +
    "|" +
    curr.fileName +
    "|" +
    curr.base +
    "|" +
    curr.current +
    "\n";
  return acc + row;
}, initial);

  return mdString;
}

async function run() {
  try {
    const message = mdString(myJSON);
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