const express = require('express');
const app = express();
const ConnectDB = require('./lib/mongo');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Match = require('./model/matchSchema');
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
app.get('/', async(req, res) => {
    const userID = req.query.id;
    try{
        const response = await Match.findOne({ userID: userID });
        res.json(response);
    }
    catch(err){
        res.send('err')
    }
});

app.post('/matches', async (req, res) => {
    const userID = req.body.userID;
    // const received = req.body.received;
    const sent = req.body.sent;
    console.log(userID, sent);
    const fetchUserID = await Match.findOne({ userID: userID });
    const fetchSentID = await Match.findOne({ userID: sent });
    if (!fetchUserID) {
        const sentMatch = new Match({
            userID: userID,
            sent: [sent],
            recieved: []
        });
        try { await sentMatch.save() }
        catch (err) { console.log(err) };
    }
    if (fetchUserID) {
        const updateSent = await Match.findOneAndUpdate(
            { userID: userID },
            { $push: { sent: sent } }
        );
        try { await updateSent.save() }
        catch (err) { console.log(err) };
    }
    if(!fetchSentID){
        const recievedMatch = new Match({
            userID: sent,
            sent: [],
            received: [req.body.userID]
        });
        try { await recievedMatch.save() }
        catch (err) { console.log(err) };
    }
    if(fetchSentID){
        const updateReceived = await Match.findOneAndUpdate(
            { userID: sent },
            { $push: { received: userID } }
        );
        try { await updateReceived.save() }
        catch (err) { console.log(err) };
    }


    res.send('ok')
});


app.post('/getMatches', async (req, res) => {
    const token = req.body.token
    const decoded = jwt.decode(token.value, process.env.JWT_SECRET);
    const userID = decoded.serial;
    const getData = await Match.findOne({ userID: userID });
    res.json({
        message: 'GetMatches service reached',
        data: getData,
    })
});

app.listen(process.env.PORT, () => {
    ConnectDB();
    console.log(`Matchmaking listening on port ${process.env.PORT}`);
});