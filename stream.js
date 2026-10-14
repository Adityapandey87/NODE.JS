const fs= require("fs");

const readStream= fs.createReadStream("intro.txt")
readStream.on("data", (chunk)=>{
    console.log("Data received");
    console.log(chunk); 
});
