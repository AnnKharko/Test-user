module.exports = {
    // NOT FOUND
    USER_NOT_FOUND: {
        customCode: 4040,
        message: 'User with such id or email not exist'

    },
    NOT_EXIST_USER_WITH_SUCH_TOKEN: {
        customCode: 4041
    },
    NOT_EXIST_USER_WITH_SUCH_ID: {
        customCode: 4042
    },
    CREDENTIALS_NOT_DEFINED: {
        customCode: 4043,
        message: 'Root email credentials are not defined!'
    },

    // BAD REQUEST
    BAD_REQUEST: {
        customCode: 4000
    },
    WRONG_EMAIL_OR_PASSWORD: {
        customCode: 4001,
        message: 'Wrong email or password'
    },
    TOKEN_IS_REQUIRED: {
        customCode: 4002,
        message: 'Token is required'
    },
    REFRESH_TOKEN_IS_REQUIRED: {
        customCode: 4003,
        message: 'Refresh token is required'
    },
    ACTIVATE_TOKEN_IS_REQUIRED: {
        customCode: 4004,
        message: 'Activate token is required'
    },
    RESET_PASSWORD_TOKEN_IS_REQUIRED: {
        customCode: 4005,
        message: 'Reset_password token is required'
    },
    NOT_VALID_FILE: {
        customCode: 4006
    },
    USER_ALREADY_REGISTERED: {
        customCode: 4007,
        message: 'User is already registered'
    },
    USER_ALREADY_ACTIVATED: {
        customCode: 4008,
        message: 'User is already activated'
    },
    NOT_VALID_PASSWORD: {
        customCode: 4009,
        message: 'Wrong password'
    },
    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        customCode: 4010,
        message: 'Not valid token'
    },
    NOT_VALID_REFRESH_TOKEN: {
        customCode: 4011,
        message: 'Not valid refresh token'
    },
    NOT_VALID_ACTIVATE_TOKEN: {
        customCode: 4012,
        message: 'Not valid activate token'
    },
    NOT_VALID_RESET_PASSWORD_TOKEN: {
        customCode: 4013,
        message: 'Not valid reset_password  token'
    },
    // PAYLOAD_TOO_LARGE
    FILE_TOO_LARGE: {
        customCode: 4130,
        message: 'File too large'
    },
    //    NOT_ALLOWED
    ONLY_ONE_FILE_ALLOWED_UPLOAD: {
        customCode: 4051,
        message: 'Only one photo is  allowed to be upload'
    },
    THIS_MIMETYPE_NOT_ALLOWED: {
        customCode: 4052,
        message: 'THIS MIMETYPE NOT ALLOWED'
    },
    THIS_PHOTO_MIMETYPE_NOT_ALLOWED: {
        customCode: 4052,
        message: 'THIS PHOTO MIMETYPE NOT ALLOWED'
    },
    THIS_DOC_MIMETYPE_NOT_ALLOWED: {
        customCode: 4052,
        message: 'THIS DOC MIMETYPE NOT ALLOWED'
    },
    // FORBIDDEN
    FORBIDDEN: {
        customCode: 4030,
        message: 'Access denied'
    },
    FORBIDDEN_USER_NOT_CONFIRMED: {
        customCode: 4031,
        message: 'User is not confirmed'
    },
    // SERVER_ERROR
    WRONG_ACTION: {
        customCode: 5000,
        message: 'Wrong action'
    },
    WRONG_MAIL_ACTION: {
        customCode: 5001,
        message: 'Wrong email action'
    },
};
