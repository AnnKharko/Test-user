const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
    activate_token: { type: String },
    access_token: { type: String },
    refresh_token: { type: String },
    reset_password_token: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = model('O_Auth', oAuthSchema);
