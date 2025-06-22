const fs = require('fs');
const fsPromises = require('fs').promises;
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(chalk.blue('Choose method (callback/promise/async): '), (method) => {
  rl.question(chalk.blue('Enter file path (e.g., example.txt): '), (filePath) => {
    readFile(method.trim().toLowerCase(), filePath.trim());
    rl.close();
  });
});

function readFile(method, filePath) {
  switch (method) {
    case 'callback':
      console.log(chalk.cyan('\nUsing Callback:'));
      console.time("Time Taken");
      fs.readFile(filePath, 'utf8', (err, data) => {
        console.timeEnd("Time Taken");
        if (err) {
          console.error(chalk.red('Error:'), err.message);
          return;
        }
        console.log(chalk.green('File content (Callback):\n'), data);
        fs.writeFileSync("copy.txt", data);
        console.log(chalk.yellow('File content also saved to copy.txt'));
      });
      break;

    case 'promise':
      console.log(chalk.cyan('\n Using Promise:'));
      console.time("Time Taken");
      fsPromises.readFile(filePath, 'utf8')
        .then(data => {
          console.timeEnd("Time Taken");
          console.log(chalk.green('File content (Promise):\n'), data);
          return fsPromises.writeFile("copy.txt", data);
        })
        .then(() => {
          console.log(chalk.yellow('File content also saved to copy.txt'));
        })
        .catch(err => {
          console.error(chalk.red('Error:'), err.message);
        });
      break;

    case 'async':
      console.log(chalk.cyan('\nUsing Async/Await:'));
      (async () => {
        try {
          console.time("Time Taken");
          const data = await fsPromises.readFile(filePath, 'utf8');
          console.timeEnd("Time Taken");
          console.log(chalk.green('File content (Async/Await):\n'), data);
          await fsPromises.writeFile("copy.txt", data);
          console.log(chalk.yellow('File content also saved to copy.txt'));
        } catch (err) {
          console.error(chalk.red('Error:'), err.message);
        }
      })();
      break;

    default:
      console.log(chalk.red('Invalid method. Please enter: "callback", "promise", or "async".'));
  }
}
