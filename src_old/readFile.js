import * as fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = '/cvs/nodejs-hw1-ex1.csv';
const txtFilePath = '/cvs/nodejs-hw1-ex1.txt';
const readStreamCvs = fs.createReadStream(`${__dirname}${csvFilePath}`);
const writeStream = fs.createWriteStream(`${__dirname}${txtFilePath}`)

readStreamCvs
.pipe(csv())
.pipe(writeStream)
.on('error', (error) => {
  throw new Error(`Error creating CSV file: ${error.message}`)
})
.on('end', () => {
console.log('csv file successfully converted to json');
});

readStreamCvs
  .on('error', (error) => {
      throw new Error(`Error reading CSV file: ${error.message}`)
  })

writeStream
  .on('error', (error) => {
      throw new Error(`Error reading CSV file: ${error.message}`)
  })