const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose schema for the team
const Flag = new Schema({
    flag: {
        type: String,
        required: true
    }
});

module.exports = flag = mongoose.model('Flag', Flag);