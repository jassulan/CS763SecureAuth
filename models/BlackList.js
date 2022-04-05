const mongoose = require('mongoose');

const BlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('blacklist', BlackListSchema);
