module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    AUTHORIZATION: 'Authorization',
    USER_IS_CREATED: 'USER IS CREATED',
    USER_IS_DELETED: 'USER IS DELETED',
    USER_IS_ACTIVATED: 'USER IS ACTIVATED',
    USER_IS_UPDATED: 'USER IS UPDATED',
    UNKNOWN_FILE: 'UNKNOWN FILE',
    NO_REPLY: 'no-reply@codemoto.io',
    CHECK_EMAIL: 'Check your inbox to activate your account.',
    CHECK_EMAIL_TO_COMPLETE: 'Check your inbox to complete the reset password.',
    PASSWORD_SUCCESSFULLY_CHANGED: 'Password successfully changed',
    AVATAR_SUCCESSFULLY_CHANGED: 'Avatar successfully changed',

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
        BLOCKED: 'blocked',
        DELETED: 'deleted',
        CONFIRMED: 'confirmed',
        PENDING: 'pending'
    },
    ROLE_ENUM: {
        ADMIN: 'admin',
        USER: 'user'
    },
    LOG_ENUM: {
        CHANGE_AVATAR: 'change_avatar',
        USER_LOGIN: 'user_login',
        USER_LOGOUT: 'user_logout',
        USER_CONFIRMED: 'user_confirmed',
        USER_REGISTERED: 'user_registered',
        USER_RESET_PASSWORD: 'user_reset_password',
        USER_FORGOT_PASSWORD: 'user_forgot_password',
        USER_UPDATED: 'user_updated'
    }
};
