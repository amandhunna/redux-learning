const resolvePercyTokens = () => {
    fs = require("fs");
    fs.writeFile("temptokens.txt", "[portal-mweb, portal-dweb]", function (err) {
      if (err) return console.log(err);
      console.log("Temp Tokens > temptokens.txt");
    });
};

resolvePercyTokens();
