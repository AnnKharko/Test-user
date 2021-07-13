const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({

    email: Joi.string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
});
