const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const User = require('../models/user.model');
const Playlist = require('../models/playlist.model');

const uri = process.env.ATLAS_URI; // Replace with your MongoDB URI
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options).then(async () => {
    console.log('Connected to MongoDB');

    try {
        // Fetch all users
        const users = await User.find().exec();

        for (const user of users) {
            for (const userPlaylist of user.playlist) {
                const playlistData = {
                    name: userPlaylist.name,
                    status: userPlaylist.status,
                    image: userPlaylist.image,
                    tracks: userPlaylist.tracks,
                    user: user.email
                };

                // Save playlist instance to the database
                const playlist = new Playlist(playlistData);
                await playlist.save();
            }
        }

        console.log('Playlists saved to the database');
    } catch (err) {
        console.error('Error saving playlists to the database:', err);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.disconnect();
});
