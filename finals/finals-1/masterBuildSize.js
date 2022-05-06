const path = require("path");
const fs = require("fs");
const core = require("@actions/core");
const github = require("@actions/github");

const args = process.argv;

// contain all files
const fileTracker = {
    /* filepath: { base, current } */
};

// contain files that changed in size
const deltaFiles = {};

// masterBuildSize.txt/stats path
const baseFile = __dirname.split("scripts")[0];
const package = process.env.packagePath;
const statFile = path.join(baseFile, "stats", package, "masterBuildSize.txt");

core.info(`package name :: ${package}`);
core.info(`Stats file path:: ${statFile}`);
core.info(`app env :: ${process.env.APP_ENV}`);
core.info(`all env :: ${JSON.stringify(process.env)}`);

/**
 * @description convert json formatted data to md format (table format)
 * @param data json data having file name and its current base size
 * @returns string in md format
 */
function mdString(myJSON) {
    const conversionArr = Object.entries(myJSON).map(([key, values], index) => ({
        Sno: index + 1,
        fileName: key,
        ...values,
    }));
    const initial =
        "Sno | FileName | Base |Current \n------------ | ------------- | ------------- | -------------\n";

    const mdString = conversionArr.reduce((acc, curr) => {
        const row = curr.Sno + "|" + curr.fileName + "|" + curr.base + "|" + curr.current + "\n";
        return acc + row;
    }, initial);

    return mdString;
}

/**
 * @description comment on PR with the details of size changes in files
 * @param data json data having file name and its current base size
 * @returns null
 */
const commentDeltaFiles = async data => {
    try {
        const { context } = github;
        const deltaData = `Delta files for ${package}. \n ${mdString(data)}`;
        const pull_request_number = context.payload.pull_request.number;
        const owner = context.actor;
        const octokit = new github.getOctokit(process.env.BOT_AUTH_TOKEN);
        const repo = context.payload.repository.name;

        await octokit.rest.issues.createComment({
            owner: owner,
            repo: repo,
            issue_number: pull_request_number,
            body: deltaData,
            ...context.repo,
        });
        return null;
    } catch (error) {
        core.setFailed(`comment action failed with error::: ${error}`);
    }
};

/* check if base file exist */
const isBaseFileExist = fs.existsSync(statFile);

/**
 * @description util
 * @param filePath file path
 * @returns trimmed file name
 */
const getJSFileName = filePath => {
    const trimmedName = filePath?.trim() || filePath;
    if (trimmedName === "total") {
        return trimmedName;
    }

    return trimmedName?.split(".")[1].trim();
};

/**
 * @description util: checks if given file has .map extension
 * @param filePath file path
 * @returns boolean
 */
const checkIsMapFile = filePath => filePath?.split(".").includes("map");

/**
 * @param dataLines file path
 * @param type current file or base file
 * @param fileTrackerObj object contains stats in object form
 * @description util: parse txt file and add it to the fileTrackerObj, ignore map files
 * @returns null
 */
function addProperties(dataLines, type, fileTrackerObj) {
    const lines = dataLines.split("\n");
    lines.forEach(line => {
        const [size, filePath] = line.split("\t");
        const jsFileName = getJSFileName(filePath);
        const isMapFile = checkIsMapFile(filePath);

        if (!isMapFile) {
            if (![undefined, "undefined"].includes(jsFileName)) {
                if (!Object.keys(fileTrackerObj).includes(jsFileName)) {
                    fileTrackerObj[jsFileName] = { base: 0, current: 0 };
                }
                fileTrackerObj[jsFileName][type] = size;

                if (fileTrackerObj[jsFileName].base !== fileTrackerObj[jsFileName].current) {
                    deltaFiles[jsFileName] = {
                        base: fileTrackerObj[jsFileName].base,
                        current: fileTrackerObj[jsFileName].current,
                    };
                }
            }
        }
    });
}

async function main() {
    if (!package) {
        core.setFailed(
            `Action failed with error :: PR is neither labelled with "Portal m-web" nor "Portal d-web" please add any one label only`
        );
        return;
    }

    /* adding current build files size to fileTracker */
    for (let index = 2; index <= args.length - 2; index += 2) {
        const filePath = args[index + 1];
        const fileName = getJSFileName(filePath);
        const isMapFile = checkIsMapFile(filePath);
        if (isMapFile) {
            continue;
        }
        if ([undefined, "undefined"].includes(fileName)) {
            continue;
        }

        const size = args[index];
        fileTracker[fileName] = { base: 0, current: size };
    }

    try {
        if (isBaseFileExist) {
            core.info("base file exist", statFile);
            fs.readFile(statFile, "utf8", async function(error, baseData) {
                if (error) {
                    core.setFailed(`Action failed with error :: ${error}`);
                } else {
                    addProperties(baseData, "base", fileTracker);

                    core.info("******************** Output: Delta files ********************");
                    if (Object.keys(deltaFiles).length > 0) {
                        // eslint-disable-next-line no-console
                        core.info(`Total files:: ${Object.keys(deltaFiles).length}`);
                        console.log(deltaFiles);
                        await commentDeltaFiles(deltaFiles);
                    } else {
                        core.info("No file changed", deltaFiles);
                    }

                    core.info("******************** Output: build report ********************");
                    core.info(`Total files ::  ${Object.keys(fileTracker).length}`);
                    // eslint-disable-next-line no-console
                    console.log(fileTracker);
                }
            });
        } else {
            core.info("Output: build report: base file does not exist");
            // eslint-disable-next-line no-console
            console.log(fileTracker);
        }
    } catch (error) {
        core.setFailed(`Action failed with error :: ${error}`);
    }
}

main();
