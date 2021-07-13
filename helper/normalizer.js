module.exports = (object) => {
    const hiddenFields = [
        'access_token',
        'activate_token',
        'password',
        'refresh_token',
        'reset_password_token'
    ];
    const objects = JSON.parse(JSON.stringify(object));

    hiddenFields.forEach((field) => {
        if (Array.isArray(object)) {
            for (let i = 0; i < objects.length; i++) {
                delete objects[i][field];
            }
        } else {
            delete objects[field];
        }
    });
    return objects;
};
