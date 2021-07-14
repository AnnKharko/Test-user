const cron = require('node-cron');
const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule('*/30 * * * *', async () => {
        console.log('CRON RUN');
        await removeOldTokens();
        console.log('CRON STOP');
    });
};
