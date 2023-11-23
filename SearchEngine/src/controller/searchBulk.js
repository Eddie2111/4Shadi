require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('../schema/userModel');
/**
 * {
  packet: { location: false, preference: true, age: [ 18, 99 ] },
  
  userdata:{
    _id: new ObjectId("65360abf102664123d27ebe5"),
    serial: '461db1d5-5602-4a1b-abe7-084254243fd7',
    name: 'dante vector',
    nid_number: 'aa-e23r3rfe',
    birth_cert: '12-asvcd-23f',
    marriage_cert: 'AA_BD3418',
    age: '48',
    phone_number: '32891823242',
    height: "5'10",
    location: '12/w, east dakota',
    preferences: '6',
    email: 'test@user.com',
    gender: 'Male',
    lookingFor: 'Female'
  }
}
 */
async function SearchBulk(req, res) {
    const token = req.body.token.value;
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    const userdata = await UserModel.find({serial: decodedToken.serial.toString()});
    const target = await SearchLocation(userdata[0].location);
    console.log(target);
    const {packet} = req.body;
    res.json({msg: 'success', data: userdata});
}

module.exports = SearchBulk;

async function SearchLocation(UserLocation) {
    const regexPattern = UserLocation.split(',').map((location) => `^${location.trim()}`).join('|');
    console.log(regexPattern);
    const userFoundBasedLocation = await UserModel.find({location: {$regex: regexPattern, $options: 'i'}});
    return userFoundBasedLocation;
}


