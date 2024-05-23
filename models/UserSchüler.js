const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
 
const sSchema = new mongoose.Schema({
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
    lehrer: {
        type: ObjectId,
        required: true,
        unique: false,
        lowercase: false
    },
    password: {
        type: String,
        required: false,
        minLength: 8
    }
})

const Schüler = mongoose.model('schüler', sSchema);
module.exports = Schüler;