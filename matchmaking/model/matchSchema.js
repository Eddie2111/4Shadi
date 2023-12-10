const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    sent: [
        {
            type: String,
            required: true,
            unique: true
        }
    ],
    received: [
        {
            type: String,
            required: true,
            unique: true
        }
    ]
    }
    , { collection: 'matches' }
);

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;