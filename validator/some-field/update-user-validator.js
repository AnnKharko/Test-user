const Joi = require('joi');

const { constant, regexpEnum } = require('../../constant');

module.exports = Joi.object({

    gender: Joi.string().trim().allow('male', 'female'),
    name: Joi.string()
        .trim()
        .min(3)
        .max(24),
    phone: Joi.string().trim().regex(regexpEnum.PHONE_REGEXP),
    yearOfBorn: Joi.number().integer().min(constant.CURRENT_YEAR - 100).max(constant.CURRENT_YEAR - 18)
});
