'use strict';
const express = require('express');
const app = express();
const dbConnect = require('./lib/mongo');
const cors = require('cors');
const UserSchema = require('./schema/userModel');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const UserModel = require('./schema/userModel');
const SearchBulk = require('./controller/searchBulk');
require('dotenv').config();
app.use(cors(
    {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    },
));
app.use(express.json());
app.use(cookieparser());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'SearchEngine service reached',
        method: 'GET',
    });
});
const searchBulk = require('./controller/searchBulk');
app.post('/', async (req, res) => {
    // SearchBulk(req, res);
    const token = req.body.token.value; // cookie
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET); // decodedToken = {serial,email}
    try {
        const userdata = await UserModel.find({serial: decodedToken.serial.toString()});
        const lookingFor = userdata[0].lookingFor;
        const locations = userdata[0].location;
        const preferences = userdata[0].preferences;
        const locationArray = locations.split(',');
        const preferencesArray = preferences.split(',');
        console.log(req.body.Query);
        if (req.body.Query.location === true && req.body.Query.preference === false) {
            const SearchLocation = await UserModel.find(
                {
                    gender: lookingFor,
                    location: {$regex: locationArray[0], $options: 'i'},
                });
            res.json({
                message: 'SearchEngine service reached',
                data: SearchLocation,
            });
        }
        if (req.body.Query.location === false && req.body.Query.preference === true) {
            const SearchLocation = await UserModel.find(
                {
                    gender: lookingFor,
                    preferences: {$regex: preferencesArray[0], $options: 'i'},
                },
            );
            res.json({
                message: 'SearchEngine service reached',
                data: SearchLocation,
            });
        }
        if (req.body.Query.location === true && req.body.Query.preference === true) {
            const SearchLocation = await UserModel.find(
                {
                    gender: lookingFor,
                    location: {$regex: locationArray[0], $options: 'i'},
                    preferences: {$regex: preferencesArray[0], $options: 'i'},
                },
            );
            res.json({
                message: 'SearchEngine service reached',
                data: SearchLocation,
            });
        }
        if (req.body.Query.location === false && req.body.Query.preference === false) {
            const SearchLocation = await UserModel.find(
                {
                    gender: lookingFor,
                },
            );
            res.json({
                message: 'SearchEngine service reached',
                data: SearchLocation,
            });
        }
    } catch (err) {
        res.json({
            message: 'SearchBulk',
            data: [],
        });
    }
});

app.post('/random', async (req, res) => {
    try {
        const token = req.body.token.value
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        const userdata = await UserModel.find({serial: decoded.serial.toString()});
        const lookingFor = userdata[0].lookingFor;
        const SearchLocation = await UserModel.find(
            {
                gender: lookingFor,
            },
        );
        res.json({
            message: 'SearchEngine service reached',
            data: SearchLocation,
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'SearchBulk',
            data: [],
        });
    }
});

app.listen(port, () => {
    dbConnect();
    console.log(`SearchEngine running at-> ${port}`);
});
