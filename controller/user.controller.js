const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const {
    logService, mailService, userService, uploadService
} = require('../service');
const { constant, emailActionsEnum, statusCodesEnum } = require('../constant');
const { normalizer, passwordHasher } = require('../helper');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const findUsers = await userService.findAll();
            const users = await normalizer(findUsers);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const findUser = await userService.findOne(id);
            const user = await normalizer(findUser);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {
                body: { password, email, name },
                avatar, docs, videos
            } = req;

            const hashPassword = await passwordHasher.hash(password);
            const { user, activate_token } = await userService.createOne({ ...req.body, password: hashPassword });

            if (avatar) {
                await uploadService.userUploadDirBuilder(avatar, user._id, 'photo');
            }

            if (docs) {
                for (const doc of docs) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.userUploadDirBuilder(doc, user._id, 'doc');
                }
            }

            if (videos) {
                for (const video of videos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.userUploadDirBuilder(video, user._id, 'video');
                }
            }

            await mailService.sendMail(email, emailActionsEnum.ACTIVATE, { userName: name, token: activate_token });
            await logService.createLog({ event: constant.LOG_ENUM.USER_REGISTERED, userId: user._id });

            res.status(statusCodesEnum.CREATED).json(constant.CHECK_EMAIL);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const authId = req.infoTokens;
            const { email, name } = req.userInfo;

            await userService.deleteOne(id, authId);
            await mailService.sendMail(email, emailActionsEnum.USER_DELETED, { userName: name });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    },
    activateUser: async (req, res, next) => {
        try {
            const { user, _id } = req.activeInfo;

            if (user.status !== constant.STATUS_ENUM.PENDING) { // additional
                return next(new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.USER_ALREADY_ACTIVATED));
            }

            await userService.activateOne(user._id, _id);
            await mailService.sendMail(user.email, emailActionsEnum.WELCOME, { userName: user.name });
            await logService.createLog({ event: constant.LOG_ENUM.USER_CONFIRMED, userId: user._id });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_ACTIVATED);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;
            const token = await userService.forgotPass(_id);

            await mailService.sendMail(email, emailActionsEnum.RESET_PASSWORD, { userName: name, token });
            await logService.createLog({ event: constant.LOG_ENUM.USER_FORGOT_PASSWORD, userId: _id });

            res.status(statusCodesEnum.OK).json(constant.CHECK_EMAIL_TO_COMPLETE);
        } catch (e) {
            next(e);
        }
    },
    resetForgotPassword: async (req, res, next) => {
        try {
            const { resPasswordInfo: { _id, user }, body: { password } } = req;

            const hashPassword = await passwordHasher.hash(password);
            await userService.resetForgotPass(user._id, hashPassword, _id);
            await mailService.sendMail(
                user.email,
                emailActionsEnum.SUCCESSFULLY_RESET_PASSWORD,
                { userName: user.name }
            );
            await logService.createLog({ event: constant.LOG_ENUM.USER_RESET_PASSWORD, userId: user._id });

            res.status(statusCodesEnum.OK).json(constant.PASSWORD_SUCCESSFULLY_CHANGED);
        } catch (e) {
            next(e);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const { userId: { _id }, body: { newPassword } } = req;

            const hashPassword = await passwordHasher.hash(newPassword);
            await userService.resetPass(_id, hashPassword);

            await logService.createLog({ event: constant.LOG_ENUM.USER_RESET_PASSWORD, userId: _id });

            res.status(statusCodesEnum.OK).json(constant.PASSWORD_SUCCESSFULLY_CHANGED);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { body, params: { id } } = req;

            await userService.updateOne(id, body);
            await logService.createLog({ event: constant.LOG_ENUM.USER_UPDATED, userId: id });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_UPDATED);
        } catch (e) {
            next(e);
        }
    },
    changeAvatar: async (req, res, next) => {
        try {
            const { avatar, userInfo } = req;

            await uploadService.userUploadDirBuilder(avatar, userInfo._id, 'photo');
            await logService.createLog({ event: constant.LOG_ENUM.CHANGE_AVATAR, userId: userInfo._id });
            res.status(statusCodesEnum.OK).json(constant.AVATAR_SUCCESSFULLY_CHANGED);
        } catch (e) {
            next(e);
        }
    }
};
