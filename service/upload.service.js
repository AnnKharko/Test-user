const fs = require('fs/promises');
const { constant } = require('../constant');
const { uploadFileDirBuilder } = require('../helper');
const { User } = require('../dataBase/models');

const userUploadDirBuilder = async (uploadFile, itemId, uploadType) => {
    const { filePath, fileDir, uploadPath } = uploadFileDirBuilder('user', uploadFile.name, uploadType, itemId);

    await fs.mkdir(fileDir, { recursive: true });

    await uploadFile.mv(filePath);

    switch (uploadType) {
        case 'photo':
            await User.updateOne({ _id: itemId }, { $set: { avatar: uploadPath } });
            break;
        case 'doc':
            await User.updateOne({ _id: itemId }, { $push: { doc: uploadPath } });
            break;
        case 'video':
            await User.updateOne({ _id: itemId }, { $push: { video: uploadPath } });
            break;
        default:
            console.log(constant.UNKNOWN_FILE);
    }
};

module.exports = { userUploadDirBuilder };
