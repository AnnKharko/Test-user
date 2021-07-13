const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const templatesInfo = require('../email-templates');
const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const {
    FRONTEND_URL, ROOT_EMAIL, ROOT_EMAIL_PASSWORD, ROOT_EMAIL_SERVICE
} = require('../config/config');
const { NO_REPLY } = require('../constant/constant');

if (
    !FRONTEND_URL
    || !ROOT_EMAIL
    || !ROOT_EMAIL_PASSWORD
    || !ROOT_EMAIL_SERVICE
    || !NO_REPLY
) {
    throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.CREDENTIALS_NOT_DEFINED);
}

const contextExtension = {
    frontendUrl: FRONTEND_URL
};

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(errorCodesEnum.SERVER_ERROR, errorCustomCodes.WRONG_MAIL_ACTION);
        }

        Object.assign(context, contextExtension);

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: `${NO_REPLY}<ROOT_EMAIL>`,
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
