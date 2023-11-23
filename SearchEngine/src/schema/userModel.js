const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
    serial: String,
    name: String,
    email: String,
    nid_number: String,
    birth_cert: String,
    marriage_cert: String,
    age: String,
    phone_number: String,
    height: String,
    location: String,
    preferences: String,
    gender: String,
    lookingFor: String,
}, {collection: 'Profile'},
);

module.exports = mongoose.model('User', User);
