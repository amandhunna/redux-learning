const resolvePercyTokens = () => {
    fs = require("fs");

    const template = `{ "label" : ["portal-mweb", "portal-dweb" ] }`

    fs.writeFile("tempLabels.txt", template, function (err) {
      if (err) return console.error("error in creating file", err);
      console.log("File created successfully");
    });
};

resolvePercyTokens();
