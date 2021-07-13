const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome in the our website'
    },
    [emailActionsEnum.USER_DELETED]: {
        templateName: 'user-deleted',
        subject: 'User was deleted'
    },
    [emailActionsEnum.ACTIVATE]: {
        templateName: 'activate',
        subject: 'Activate user account'
    },
    [emailActionsEnum.RESET_PASSWORD]: {
        templateName: 'reset-password',
        subject: 'Reset the password on your account'
    },
    [emailActionsEnum.SUCCESSFULLY_RESET_PASSWORD]: {
        templateName: 'successfully-reset-password',
        subject: 'Your password was successfully reset'
    }
};
