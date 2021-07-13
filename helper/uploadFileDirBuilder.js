const path = require('path');
const uuid = require('uuid').v1;

module.exports = (object, uploadFileName, fileType, itemId) => {
    const pathWithoutStatic = path.join(object, `${itemId}`, fileType);
    const fileDir = path.join(process.cwd(), 'static', pathWithoutStatic);
    const fileExtension = uploadFileName.split('.').pop();
    const fileName = `${uuid()}.${fileExtension}`;
    const filePath = path.join(fileDir, fileName);
    const uploadPath = path.join(pathWithoutStatic, fileName);

    return { filePath, fileDir, uploadPath };
};
