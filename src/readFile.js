const csv = require('csvtojson')
const fs = require('fs')

const csvFilePath = '/cvs/nodejs-hw1-ex1.csv';
const txtFilePath = '/cvs/nodejs-hw1-ex1.txt';
const readStreamCvs = fs.createReadStream(`${__dirname}${csvFilePath}`);
const writeStream = fs.createWriteStream(`${__dirname}${txtFilePath}`)

csv()
  .fromStream(readStreamCvs)
  .subscribe(json => {
    const txtfile = writeStream;
    txtfile.write(JSON.stringify(json, null, 4));
  })
  .on('error', (error) => {
    throw new Error(`Error reading CSV file: ${error.message}`)
  })

readStreamCvs
  .on('error', (error) => {
      throw new Error(`Error reading CSV file: ${error.message}`)
  })

writeStream
  .on('error', (error) => {
      throw new Error(`Error reading CSV file: ${error.message}`)
  })