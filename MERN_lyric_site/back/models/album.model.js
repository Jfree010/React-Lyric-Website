const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Song = require('./song.model')

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  tracks: [Song.schema]
})

const Album = mongoose.model('Album', AlbumSchema)
module.exports = Album
