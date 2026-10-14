import fs from 'fs'
fs.Stats("note.txt", (err, stats) => {
    if (err) {
        console.log(err);
        return;
    }   
    console.log("information about the [note.txt]", stats);
    console.log("size of the file in bytes", stats.size,"bytes");
    console.log("created time of the file", stats.birthtime.toISOString()   );
    console.log("modified time of the file", stats.mtime.toISOString()   );
    console.log("access time of the file", stats.atime.toISOString()   );
    console.log("change time of the file", stats.ctime.toISOString()   );
    
    console.log("is file", stats.isFile());
    console.log("is directory", stats.isDirectory());




});
