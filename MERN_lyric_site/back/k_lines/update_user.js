const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const Playlist = require('../models/playlist.model');
const User = require('../models/user.model');

const uri = process.env.ATLAS_URI; // Replace with your MongoDB URI
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, options).then(async () => {
    console.log('Connected to MongoDB');

    try {
        // Fetch all users
        const users = await User.find();

        for (const user of users) {
            if (Array.isArray(user.playlist)) {
                for (const playlist of user.playlist) {
                    // Find the playlist document in the Playlist collection
                    const playlistDoc = await Playlist.findOne({ name: playlist.name});

                    if (playlistDoc) {
                        // Update the playlist._id in the user document to match the playlist document _id
                        await User.findOneAndUpdate(
                            { _id: user._id, 'playlist.name': playlist.name },
                            { $set: { 'playlist.$._id': playlistDoc._id } },
                            { new: true }
                        );
                        console.log(`Updated playlist ${playlist.name} _id to ${playlistDoc._id} for user ${user.email}.`);
                    } else {
                        console.log(`No matching playlist found for ${playlist.name} in Playlist collection.`);
                    }
                }

                console.log(`Processed user ${user.email} playlists.`);
            } else {
                console.log(`Skipping user ${user.email} as playlist field is not an array.`);
            }
        }

        console.log('Playlists updated with correct _id.');
    } catch (err) {
        console.error('Error during migration:', err);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.disconnect();
});
