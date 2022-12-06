const nodemailer = require('nodemailer')
const {envsConfig} = require('../configs')
const EmailTemplates = require('email-templates')
const path = require('path')
const templates = require('../emailTemplates/index')

const sendEmail = async (userEmail, templateName) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envsConfig.EMAIL,
            pass: envsConfig.PASSWORD
        }
    })

    const template = templates[templateName]
    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(),'src', 'emailTemplates')
        }
    });

    const html = await templateRenderer.render(template.templateName)

    transporter.sendMail({
        from: 'My program',
        to: 'volesh2@gmail.com',
        subject: template.subject,
        html
    })
}

module.exports = {
    sendEmail
}
