
const path = require('path');
const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

console.log("github", github);
const myToken = core.getInput('GITHUB_TOKEN2');
const TOKEN = core.getInput('GITHUB_TOKEN');

console.log("---", myToken);
console.log("---6o4kn", TOKEN)

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