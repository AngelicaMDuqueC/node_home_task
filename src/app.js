const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output, terminal:false });

rl.on('line', (line) => {
  console.log(line.split('').reverse().join(''));
});

rl.once('close', () => {
   // end of input
});