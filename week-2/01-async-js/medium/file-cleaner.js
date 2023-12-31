const fs = require("node:fs");

let dataFromFile;
fs.readFile('D:/Web Development/100x Devs/100x-cohort/week-2/01-async-js/medium/test.txt', "utf-8", (err, data) =>{
    if(err){
        console.log(err);
    }else{
        dataFromFile = data;
        console.log(data);
        const cleanData = dataFromFile.replace(/[\n\t\s]+/g, ' ');
        fs.writeFile('D:/Web Development/100x Devs/100x-cohort/week-2/01-async-js/medium/test.txt', cleanData, (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log("Successful")
            }
        })
    }
})
