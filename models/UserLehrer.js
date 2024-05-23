const mongoose = require('mongoose');
 

const lSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: false
    },
    name: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
})

const Lehrer = mongoose.model('lehrer', lSchema);
module.exports = Lehrer;