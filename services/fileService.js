const fs = require("fs/promises");
module.exports = {
    findData:async (path)=>{
        const buffer = await fs.readFile(path)
        const data = JSON.parse(buffer.toString())

        return data
    }
}
