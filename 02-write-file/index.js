const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// проверяем файл для записей на наличие и, если нет, то создадим файл.
fs.writeFile(  path.join(__dirname, 'toasts.txt'), '', { flag: 'a+' }, (err) => { if (err) throw err; });

// событие ctr+C на закрытие
rl.on('SIGINT', () => ex());

// функция закрытия приложения
function ex() {
  stdout.write('\nНу не хотите, как хотите! :(\nПока!');
  rl.close();
  process.exit();
}

stdout.write('Простите!\nНе торопитесь, пожлуйста, я записую.\nНапишите тост  -> ');
// функция записи в файл
function create(){
  rl.question('Напишите тост  -> ', (answer) => {
    if( answer.trim() === 'exit') ex(); // закрываем, если введён exit, даже с пробелами
    fs.appendFile( path.join(__dirname, 'toasts.txt'), `${answer}\n`, (err) => { if (err) throw err; });
    create();
  });
}
create();