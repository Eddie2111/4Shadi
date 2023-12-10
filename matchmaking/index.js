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
    const received = req.body.received;

    try {
        // Check if sender exists
        let sender = await Match.findOne({ userID: userID });
        // If sender doesn't exist, create a new sender
        if (!sender) {
            sender = new Match({
                userID: userID,
                sent: [],
                received: []
            });
        }

        // Check if receiver exists
        let receiver = await Match.findOne({ userID: received[0] });

        // If receiver doesn't exist, create a new receiver
        if (!receiver) {
            receiver = new Match({
                userID: received[0],
                sent: [],
                received: []
            });
        }

        // Check if the request has already been sent
        if (sender.sent.includes(received[0])) {
            return res.send('Already sent');
        }

        // Check if the request has already been received
        if (sender.received.includes(received[0])) {
            return res.send('Already received');
        }

        // Update sender and receiver arrays
        sender.sent.push(received[0]);
        receiver.received.push(userID);

        // Save changes to the database
        await sender.save();
        await receiver.save();

        res.json({ sender: sender, receiver: receiver });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(process.env.PORT, () => {
    ConnectDB();
    console.log(`Matchmaking listening on port ${process.env.PORT}`);
});