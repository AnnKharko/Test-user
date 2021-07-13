const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    VIDEO_MAX_SIZE,
    VIDEOS_MIMETYPES
} = require('../constant/constant');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;
            const allFiles = Object.values(files);
            const docs = [];
            const photos = [];
            const videos = [];

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, size } = allFiles[i];
                if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (FILE_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodesEnum.PAYLOAD_TOO_LARGE, errorCustomCodes.FILE_TOO_LARGE);
                    }
                    docs.push(allFiles[i]);
                }

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodesEnum.PAYLOAD_TOO_LARGE, errorCustomCodes.FILE_TOO_LARGE);
                    }
                    photos.push(allFiles[i]);
                }

                if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodesEnum.PAYLOAD_TOO_LARGE, errorCustomCodes.FILE_TOO_LARGE);
                    }
                    videos.push(allFiles[i]);
                }

                if (!DOCS_MIMETYPES.includes(mimetype) && !PHOTOS_MIMETYPES.includes(mimetype)) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.THIS_MIMETYPE_NOT_ALLOWED);
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.videos = videos;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAvatar: (req, res, next) => {
        try {
            const { photos } = req;

            if (photos.length > 1) {
                throw new ErrorHandler(errorCodesEnum.NOT_ALLOWED, errorCustomCodes.ONLY_ONE_FILE_ALLOWED_UPLOAD);
            }

            [req.avatar] = req.photos;
            // req.avatar = req.photos[0];

            next();
        } catch (e) {
            next(e);
        }
    }
};
