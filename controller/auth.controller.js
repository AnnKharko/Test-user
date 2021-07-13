const { authService } = require('../service');
const { statusCodesEnum } = require('../constant');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const tokens = await authService.authUser(email, password);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { user, _id } = req.tokenInfo;
            const tokens = await authService.refreshToken(user, _id);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const { infoTokens } = req;

            await authService.removeTokens(infoTokens);

            res.sendStatus(statusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

};
