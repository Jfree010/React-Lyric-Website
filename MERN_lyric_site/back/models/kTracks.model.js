const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Karaoke = require('./karaoke.model')

const kTracksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  
  tracks: [Karaoke.schema]
})

const kTracks = mongoose.model('kTracks', kTracksSchema)
module.exports = kTracks
