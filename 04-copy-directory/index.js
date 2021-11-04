const fs = require('fs');
const path = require('path');
const folderOut = path.join(__dirname, '/files');   // D:\rs-school\HTML-builder\04-copy-directory\files
const folderIn = path.join(__dirname, '/files-copy');   // D:\rs-school\HTML-builder\04-copy-directory\files-copy

copyDir();

function copyDir() {
  // создаём папку files-copy, если её нет
  fs.mkdir(folderIn, { recursive: true }, (err) => { if (err) throw err; });

  // читаем папку files
  fs.readdir( folderOut, {withFileTypes: true}, (err, itemsOut) => {
    if (err) throw err;
    itemsOut = itemsOut.filter(el=>el.isFile()); // удаляем из массива подпапки на всякий случай, в задаче речь только о файлах
    itemsOut = itemsOut.map(el => el = el.name); // делаем массив имён файлов папки files

    // читаем папку files-copy
    fs.readdir( folderIn, {withFileTypes: true}, (err, itemsIn) => {
      if (err) throw err;
      itemsIn = itemsIn.map(el => el = el.name); // делаем массив имён файлов папки files-copy

      // сравниваем папки и убираем лишние файлы из папки files-copy
      itemsIn.forEach(el => { if(!itemsOut.includes(el)) fs.unlink(path.join(folderIn, `/${el}`), (err) => { if (err) throw err; });});

      // делаем запись и перезапись файлов
      itemsOut.forEach(el => fs.promises.copyFile(path.join(folderOut, `/${el}`), path.join(folderIn, `/${el}`)));
    });
  });
}