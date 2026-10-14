const fs= require('fs')

fs.writeFileSync("node.txt", "Hello World"), 

const data = fs.readFileSync("example.txt","utf8");
console.log("read data ", data);
// update the content of the file
fs.appendFileSync("example.txt", "hello ece-B");

