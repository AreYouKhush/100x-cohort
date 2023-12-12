const fs = require('node:fs');
const content = 'Some content!\n';
fs.writeFile('D:/Web Development/100x Devs/100x-cohort/week-2/01-async-js/easy/test.txt', content, {flag: "a+"},  err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});