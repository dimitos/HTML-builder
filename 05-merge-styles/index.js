const fs = require('fs/promises');
const path = require('path');
const folderDist = path.join(__dirname, '/project-dist');   // D:\rs-school\HTML-builder\05-merge-styles\project-dist
const folderStyles = path.join(__dirname, '/styles');        // D:\rs-school\HTML-builder\05-merge-styles\styles
const extname = '.css';

fs.writeFile( path.join(folderDist, '/bundle.css'), '', (err) => { if (err) throw err; });

// Чтение содержимого папки styles
fs.readdir( folderStyles, {withFileTypes: true}).then(files => {

  for (let i = 0; i < files.length; i++) {
    let pathName = path.join(folderStyles, `/${files[i].name}`);

    // Проверка является ли объект файлом и имеет ли файл нужное расширение
    if (files[i].isFile() && path.extname(pathName) === extname) {
      // Чтение файла стилей
      fs.readFile(pathName, 'utf-8').then(data => {
        fs.appendFile( path.join(folderDist, 'bundle.css'), `${data}\n`);
      });
    }
  }
});