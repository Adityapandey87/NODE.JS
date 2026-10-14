import fs from 'fs'
 function sizeChecker(filePath) {
    const stats = fs.statSync(filePath);
    const limit= 2*1024*1024; // 2MB
    if (stats.size > limit) {
        console.log(`File size exceeds the limit of ${limit} bytes.`);
    } else {
        console.log(`File size is within the limit: ${stats.size} bytes.`);
    }
    