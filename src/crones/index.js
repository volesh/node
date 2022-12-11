const removeOldTokensCron = require('./removeOldTokensCron')
const cronRunner = () =>{
    removeOldTokensCron.start()
}

module.exports = {
    cronRunner
}
