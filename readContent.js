
const path = require('path');
const fs = require('fs');

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
fs.readFile(baseFile, 'utf8', function(error, baseData){      
    if(error) {
        console.error("error is base: ", error)
    } else {
        addProperties(baseData,"base", fileTracker)

        console.log(fileTracker);
    }
});

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
