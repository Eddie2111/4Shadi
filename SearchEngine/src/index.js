'use strict';
const express = require('express');
const app = express();
const dbConnect = require('./lib/mongo');
const cors = require('cors');
const UserSchema = require('./schema/userModel');
const cookieparser = require('cookie-parser');
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
    res.send('Hello World!');
});
const searchBulk = require('./controller/searchBulk');
app.post('/', async (req, res) => {
    searchBulk(req, res);
});

app.listen(port, () => {
    dbConnect();
    console.log(`SearchEngine running at-> ${port}`);
});
