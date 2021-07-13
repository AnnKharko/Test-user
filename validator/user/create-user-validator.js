const Joi = require('joi');

const { constant, regexpEnum } = require('../../constant');

module.exports = Joi.object({
    email: Joi.string().email().required(),
    // email: Joi.string()
    // .regex(regexpEnum.EMAIL_REGEXP)
    // .required(),
    gender: Joi.string().trim().allow('male', 'female').required(),
    name: Joi.string()
        .alphanum()
        .trim()
        .min(3)
        .max(24)
        .required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
    phone: Joi.string().trim().regex(regexpEnum.PHONE_REGEXP),
    repeat_password: Joi.ref('password'),
    yearOfBorn: Joi.number().integer().min(constant.CURRENT_YEAR - 100).max(constant.CURRENT_YEAR - 18)
});
