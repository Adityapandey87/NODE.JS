const fs = require("fs");

const watcher = fs.watch("intro.txt", (curr, prev) => {
    console.log("privious stats: ", {prev});
    console.log("current stats: ", {curr});
    if(p
});

