const {emailConfig} = require('../configs')
module.exports = {
    [emailConfig.LOGIN]: {
        subject:'Login',
        templateName: 'login'
    },
    [emailConfig.LALA]: {
        subject: 'Lala',
        templateName: 'lala'
    }
}
