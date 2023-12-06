const mongoose = require('mongoose');
const {Schema} = mongoose;

const pairSchema = new Schema({
    token1: String,
    token2: String,
    data: String,
    block_num: String,
    block_hash: String,
})

mongoose.model('pairs', pairSchema);