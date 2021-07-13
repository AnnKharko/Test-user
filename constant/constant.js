module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    AUTHORIZATION: 'Authorization',
    USER_IS_CREATED: 'USER IS CREATED',
    USER_IS_DELETED: 'USER IS DELETED',
    USER_IS_ACTIVATED: 'USER IS ACTIVATED',
    UNKNOWN_FILE: 'UNKNOWN FILE',
    NO_REPLY: 'no-reply@codemoto.io',
    CHECK_EMAIL: 'Check your inbox to activate your account.',
    PASSWORD_SUCCESSFULLY_CHANGED: 'Password successfully changed',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // .docs/.dot
        'application/pdf', // .pdf
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx  2007
    ],
    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ],

    STATUS_ENUM: {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        BLOCKED: 'blocked'
    },
    ROLE_ENUM: {
        ADMIN: 'admin',
        USER: 'user'
    },
    LOG_ENUM: {
        USER_LOGIN: 'user_login',
        USER_LOGOUT: 'user_logout',
        USER_CONFIRMED: 'user_confirmed',
        USER_REGISTERED: 'user_registered',
        USER_FORGOT_PASSWORD: 'user_forgot_password',
        USER_RESET_PASSWORD: 'user_reset_password',
    }
};
