
const path = require('path');
const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

console.log("github", github);

console.log("process", process.env);

const github_token1 = core.getInput('GITHUB_TOKEN');
console.log(":=1 ", github_token1);



async function run() {
  try {
    const message = "I am first comment"
    const github_token = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }
    const pull_request_number = context.payload.pull_request.number;

    const octokit = new github.GitHub(github_token);
    const new_comment = octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request_number,
        body: message
      });
    console.log("-----new", new_comment);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();



function runBuild() {
    const args =  process.argv;
    const fileTracker = {/* filepath: { base, current } */};

    /* adding current build files size to fileTracker */
    for(let index=2; index<=args.length -2; index+=2) {
        const filePath = args[index+1];
        const size = args[index];
        fileTracker[filePath] =  { base: 0, current: size }
    };

    /* reading base */
    const baseFile = path.join(__dirname, 'masterBuild.txt');

    /* check if base file exits */
    const isBaseFileExist = fs.existsSync(baseFile);
    /* util */
    function addProperties(dataLines,type, fileTracker) {
        const lines = dataLines.split("\n");
        lines.forEach(line => {
            const [size, filePath] = line.split("\t");
            if(![undefined, 'undefined'].includes(filePath)) {
                if(!Object.keys(fileTracker).includes(filePath)) {
                    fileTracker[filePath] = { base: 0, current: 0 };
                };
                fileTracker[filePath][type] =  size;
            };
        });
    };

    try {
      if (isBaseFileExist) {
          core.info("isBaseFileExist exsist");
          fs.readFile(baseFile, 'utf8', function(error, baseData){      
              if(error) {
                  // console.error("error is base: ", error.stack)
                  core.setFailed(`Action failed with error :: ${error}`);
              } else {
                  addProperties(baseData,"base", fileTracker);
                
                  core.info('Output: build report');
                  //core.info(JSON.parse(fileTracker))
                  console.log(fileTracker);
              }
          });
      } else {
          core.info('Output: build report: base file does not exsist');
          //core.info(JSON.stringify(fileTracker))
          console.log(fileTracker);
      }
    } catch(error) {
      core.setFailed(`Action failed with error :: ${error}`);
    }
}