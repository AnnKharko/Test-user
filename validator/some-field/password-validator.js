const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({

    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
    repeat_password: Joi.ref('password'),
});
