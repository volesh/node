const fs = require('node:fs')

fs.readdir('./Girls', (err, files)=>{
    for (const file of files) {
        fs.readFile(`./Girls/${file}`, (err, data)=>{
            const gender = data.toString().split('-')[1]
            if(!gender.includes('female')){
                fs.rename(`./Girls/${file}`, `./Boys/${file}`, ()=>{})
            }else{
            }
        })
    }
})


fs.readdir('./Boys', (err, files)=>{
    for (const file of files) {
        fs.readFile(`./Boys/${file}`, (err, data)=>{
            let gender = data.toString().split('-')[1]
            if(gender.includes('female')){
                fs.rename(`./Boys/${file}`, `./Girls/${file}`, ()=>{})
            }else{
            }
        })
    }
})



