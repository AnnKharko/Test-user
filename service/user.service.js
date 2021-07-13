const { O_Auth, User } = require('../dataBase/models');
const { tokenizer } = require('../helper');
const { STATUS_ENUM } = require('../constant/constant');

module.exports = {
    findAll: () => User.find(),
    findOne: (id) => User.findById({ _id: id }),
    findOneByParams: (params) => User.findOne(params),
    createOne: async (userObject) => {
        const { activate_token } = tokenizer('activate');

        const user = await User.create(userObject);
        await O_Auth.create({ activate_token, user: user._id });

        return { user, activate_token };
    },
    deleteOne: async (id, authId) => {
        await User.findByIdAndUpdate(id, { status: STATUS_ENUM.DELETED });
        await O_Auth.findByIdAndDelete({ _id: authId });
    },
    activateOne: async (id, tokenId) => {
        await User.findByIdAndUpdate(id, { status: STATUS_ENUM.CONFIRMED });
        await O_Auth.findByIdAndDelete({ _id: tokenId });
    },
    forgotPass: async (userId) => {
        const { reset_password_token } = tokenizer('reset_password');

        await O_Auth.create({ reset_password_token, user: userId });
        return reset_password_token;
    },
    resetForgotPass: async (userId, newPassword, tokenId) => {
        await User.findByIdAndUpdate(userId, { password: newPassword });
        await O_Auth.findByIdAndDelete(tokenId);
    },
    resetPass: async (userId, newPassword) => {
        await User.findByIdAndUpdate(userId, { password: newPassword });
    },
    updateOne: async (userId, updateObject) => {
        // await User.updateOne({ _id: userId }, { $set: updateObject });
        await User.findByIdAndUpdate(userId, { $set: updateObject });
    },
    changeAvatar: async () => { // todo service

    }
};
