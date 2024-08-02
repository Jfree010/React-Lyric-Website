const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KaraokeSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    line: { //the line in the song
        type: [String],
        required: true,
        default: []
    },
    begin: { //start time of line
        type: [Number],
        required: true,
        default: []
    },
    end: { //end time of line
        type: [Number],
        required: true,
        default: []
    },
    duration: { //length of line
        type: [String],
        required: true,
        default: []
    }, 
    overlapped: { // if 0, no lines after play while this line is playing; if 1, lines after will play while this is playing; if 2, line plays during some previous line
        type: Number,
        required: false,
        default: 0
    },
    overlap: {
        with: { //which future lines does this line overlap wtih
            type: [Number],
            required: false,
            default: []
        },
        delay: { //delays in starting time between this line and overlapping lines
            type: [String],
            required: false,
            default: []
        },
        color: {// colors of wipe animation for overlapping lines
            type: [String],
            required: false,
            default: []
        }
    }
})

const Karaoke = mongoose.model('Karaoke', KaraokeSchema)
module.exports = Karaoke