const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    musicLink: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: false
    },
    trackLink: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    }
})

const Song = mongoose.model('Song', SongSchema)
module.exports = Song