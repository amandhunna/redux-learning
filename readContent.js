
const path = require('path');
const fs = require('fs');
const { error } = require('console');

const baseFile = path.join(__dirname, 'base.txt')
const currentFile = path.join(__dirname, 'current.txt')

const fileTracker = {/* filepath: { base, current } */};
console.log("-------running-----------------")
/* reading base */
fs.readFile(baseFile, 'utf8', function(error, baseData){      
    if(error) {
        console.error("error is base: ", error)
    } else {
        
        /* reading current */
        fs.readFile(currentFile, 'utf8', function(error, currentData) {      
            if(error) {
                console.error("error in currentData: ", error)
            } else {
                addProperties(baseData,"base", fileTracker)
                addProperties(currentData, "current", fileTracker)
            }
            console.log(fileTracker);
        });
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