const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    received: [
        {
            type: String,
        }
    ],
    sent: [
        {
            type: String,
        }
    ],
    }
    , { collection: 'matches' }
);

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;