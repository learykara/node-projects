var fs = require('fs');

// Determine if input is a file or a directory
var toRead = process.argv[2] || '.';

fs.lstat(toRead, function(err, res) {
    if (err) {
        console.log("No such file or directory");
        return;
    }

   res.isFile() ? returnFile()
   :   returnDir();
});

function returnFile() {
    console.log(toRead);
    return;
}

function returnDir() {
    // Read and print files to console
    fs.readdir(toRead, function(err, files) {
        if (err) {
            console.log("No such file or directory");
            return;
        }

        console.log(files.join('\n'));
    });
}

