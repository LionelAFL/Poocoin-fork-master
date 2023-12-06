const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token0: String,
    token1: String,
    type: String,
    lp_address: {
        type: String,
        unique: true
    },
})

module.exports = mongoose.model('lpaddresses', tokenSchema);