// DEPRECATED
'use strict';
const express = require('express');
const app = express();
const dbConnect = require('./src/lib/mongo');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Got a POST request');
});

app.listen(port, () => {
    dbConnect();
    console.log(`Example app listening on port ${port}`);
});

