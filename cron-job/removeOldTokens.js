const dayjs = require('dayjs');

const { authService } = require('../service');
const { User } = require('../dataBase/models');
const { STATUS_ENUM } = require('../constant/constant');

module.exports = async () => {
    const oldTokens = [];
    const usersForRemove = [];

    const oldRefreshTokens = await authService.getTokensByParams({
        updatedAt: { $lte: dayjs(new Date()).subtract(30, 'days').format() }
    });

    const oldActivateTokens = await authService.getTokensByParams({
        updatedAt: { $lte: dayjs(new Date()).subtract(1, 'day').format() }
    });

    const oldResetPasswordTokens = await authService.getTokensByParams({
        updatedAt: { $lte: dayjs(new Date()).subtract(5, 'minutes').format() }
    });

    for (const token of oldActivateTokens) {
        if (token.activate_token) {
            oldTokens.push(token._id);
            usersForRemove.push(token.user);
        }
    }

    for (const token of oldRefreshTokens) {
        if (token.refresh_token) {
            oldTokens.push(token._id);
        }
    }

    for (const token of oldResetPasswordTokens) {
        if (token.reset_password_token) {
            oldTokens.push(token._id);
        }
    }

    for (const id of oldTokens) {
        // eslint-disable-next-line no-await-in-loop
        await authService.removeTokens(id);
    }

    for (const id of usersForRemove) {
        // eslint-disable-next-line no-await-in-loop
        await User.findByIdAndUpdate(id, { $set: { status: STATUS_ENUM.DELETED } });
    }
};
