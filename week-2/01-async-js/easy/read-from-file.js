const fs = require('node:fs');
fs.readFile('D:/Web Development/100x Devs/100x-cohort/week-2/01-async-js/easy/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});