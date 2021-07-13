const { Log } = require('../dataBase/models');

module.exports = {
    createLog: (log) => Log.create(log)
};
