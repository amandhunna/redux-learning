const resolvePercyTokens = () => {
    fs = require("fs");

    const template = { "label" : ["portal-mweb", "portal-dweb" ] }

    fs.writeFile("tempLabels.txt", `${template}`, function (err) {
      if (err) return console.log(err);
      console.log("Temp Labels > tempLabels.txt");
    });
};

resolvePercyTokens();
