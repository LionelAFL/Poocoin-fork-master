const mongoose = require('mongoose');
const {Schema} = mongoose;

const transferSchema = new Schema({
    address: String,
    from: String,
    to: String,
    amount: String,
    block_number: String,
    transaction_hash: String,
    trnasaction_index: String,
    block_hash: String,
    log_index: String,
    removed: Boolean,
    id: String
})

mongoose.model('transfers', transferSchema);