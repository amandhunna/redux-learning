
const path = require('path');
const fs = require('fs');


console.log("args :", process.argv);

const baseFile = path.join(__dirname, 'masterBuild.txt');

const fileTracker = {/* filepath: { base, current } */};
console.log("-------running-----------------");

console.log("---__dirname-", __dirname);

/* reading base */
fs.readFile(baseFile, 'utf8', function(error, baseData){      
    if(error) {
        console.error("error is base: ", error)
    } else {
        addProperties(baseData,"base", fileTracker)
        // reading current * /
/*         fs.readFile(currentFile, 'utf8', function(error, currentData) {      
            if(error) {
                console.error("error in currentData: ", error)
            } else {
                addProperties(currentData, "current", fileTracker)
            }
            console.log(fileTracker);
        });
 */
        console.log(fileTracker);
    }
});

function addProperties(dataLines,type, fileTracker) {
    const lines = dataLines.split("\n");
    lines.forEach(line => {
        const [size, filePath] = line.split("\t");
        if(![undefined, 'undefined', 'total'].includes(filePath)) {
            if(!Object.keys(fileTracker).includes(filePath)) {
                fileTracker[filePath] = { base: 0, current: 0 };
            }
            fileTracker[filePath][type] =  size;
        }
    });
}

/* 
const { spawn } = require("child_process");
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


*/