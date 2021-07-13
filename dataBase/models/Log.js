const { Schema, model } = require('mongoose');

const logSchema = new Schema({
    event: { type: String, required: true },
    userId: { type: String, required: true },
    data: { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = model('Log', logSchema);
