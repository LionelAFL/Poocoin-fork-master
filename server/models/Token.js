const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String,
        unique: true
    },
    name: String,
    symbol: String,
})

module.exports = mongoose.model('tokens', tokenSchema);