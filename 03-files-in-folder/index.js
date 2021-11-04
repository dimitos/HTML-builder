const fs = require('fs');
const { stdout } = process;
const path = require('path');

let folder = path.join(__dirname, '/secret-folder');
dirFolder(folder);

function dirFolder(folder) {
  fs.readdir( folder, {withFileTypes: true}, (err, items) => {
    if (err) throw err;

    for (var i=0; i < items.length; i++) {
      let pathName = path.join(folder, `/${items[i].name}`);
      fs.stat(pathName, function(err, stats) {
        if (err) throw err;

        if (stats.isFile()) {
          const nameFile = path.basename(pathName,path.extname(pathName));
          const extFile = path.extname(pathName).substr(1);
          const sizeFile = (stats.size / 1024).toFixed(3);
          stdout.write(`${nameFile} - ${extFile} - ${sizeFile}kb\n`);
        }
        // так можно выбрать все файлы и в подпапках
        // if (stats.isDirectory()) {
        //   dirFolder(pathName);
        // }
      });
    }

  });
}