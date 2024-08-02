const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./song.model');

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['private', 'public'],
    default: 'public'
  },
  image: {
    type: String,
    required: true
  },
  tracks: [Song.schema],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
