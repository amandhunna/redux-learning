
const path = require('path');
const fs = require('fs');


console.log("args :", process.argv);

const baseFile = path.join(__dirname, 'masterBuild.txt');

const fileTracker = {/* filepath: { base, current } */};
console.log("-------running-----------------");

const args =  process.argv

for(let index=2; index<=args.length -2; index+=2) {
    const filePath = args[index+1];
    const size = args[index];
    fileTracker[filePath] =  { base: 0, current: size }
};

/* reading base */
fs.readFile(baseFile, 'utf8', function(error, baseData){      
    if(error) {
        console.error("error is base: ", error)
    } else {
        addProperties(baseData,"base", fileTracker)

        console.log(fileTracker);
    }
});

function addProperties(dataLines,type, fileTracker) {
    const lines = dataLines.split("\n");
    lines.forEach(line => {
        const [size, filePath] = line.split("\t");
        if(![undefined, 'undefined'].includes(filePath)) {
            if(!Object.keys(fileTracker).includes(filePath)) {
                fileTracker[filePath] = { base: 0, current: 0 };
            }
            fileTracker[filePath][type] =  size;
        }
    });
}
