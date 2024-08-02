const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const Song = require('../models/song.model')
const Playlist = require('../models/playlist.model')
const mongoose = require('mongoose')

//security layer
const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser =async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const addFavorite = async (req, res) => {
    const { email } = req.params;
    const { s_title } = req.body;
    let id = null;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User email not found" });
    }

    id = user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such user" });
    }

    try {
        // Find the track
        const track = await Song.findOne({ title: s_title });
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }

        // Find the user and check if the track is already in their favorites
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isFavorite = user.favorite.some(favTrack => favTrack._id.equals(track._id));
        if (isFavorite) {
            return res.status(400).json({ message: 'Track is already in favorites' });
        }

        // Add track to user's favorite field
        user.favorite.push(track);
        await user.save();

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Error updating user', details: err.message });
    }
};


const removeFavorite = async (req, res) => {
    const { email } = req.params;
    const { s_title } = req.body;
    let id = null;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User email not found" });
    }

    id = user._id

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such user" });
    }

    try {
        // Remove track from user's favorite array
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { favorite: { title: s_title } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Error removing track from favorite', details: err.message });
    }
};

const createPlaylist = async (req, res) => {
    const { email } = req.params;
    const { name, status } = req.body;
    const images = [
        "/assets/images/playlist_red.png",
        "/assets/images/playlist_blue.png",
        "/assets/images/playlist_green.png",
        "/assets/images/playlist_pink.png"
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    const image = images[randomIndex];

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new playlist
        const newPlaylist = new Playlist({
            name,
            status,
            image,
            tracks: [], // Initialize with an empty tracks array
            user_id: user._id
        });

        // Add the new playlist to the user's playlist array
        user.playlist.push(newPlaylist);

        // Save the user
        await user.save();
        await newPlaylist.save()

        res.status(201).json(newPlaylist);
    } catch (err) {
        res.status(500).json({ error: 'Error creating playlist', details: err.message });
    }
};

const addToPlaylist = async (req, res) => {
    const { email } = req.params;
    const { name, title } = req.body;

    try {
        // Find the song by title
        const song = await Song.findOne({ title });
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        // Find the user and the specific playlist
        const user = await User.findOne({ email, 'playlist.name': name });
        if (!user) {
            return res.status(404).json({ error: "User or playlist not found" });
        }

        // Check if the song is already in the playlist
        const playlist = user.playlist.find(pl => pl.name === name);
        const isSongInPlaylist = playlist.tracks.some(track => track._id.equals(song._id));
        
        if (isSongInPlaylist) {
            return res.status(400).json({ message: 'Song is already in the playlist' });
        }
        
        // Add song to the playlist
        const updatedUser = await User.findOneAndUpdate(
            { email, 'playlist.name': name },
            { $push: { 'playlist.$.tracks': song } },
            { new: true }
        );

        // Find the updated playlist instance and update it
        const playlistInstance = await Playlist.findOneAndUpdate(
            { _id: playlist._id },
            { $push: { tracks: song } },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Error adding song to playlist', details: err.message });
    }
};

const removeFromPlaylist = async (req, res) => {
    const { email } = req.params;
    const { name, title } = req.body;

    try {
        // Find the song by title
        const song = await Song.findOne({ title });
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        // Find the user and the specific playlist
        const user = await User.findOne({ email, 'playlist.name': name });
        if (!user) {
            return res.status(404).json({ error: "User or playlist not found" });
        }

        // Check if the song is in the playlist
        const playlist = user.playlist.find(pl => pl.name === name);
        const isSongInPlaylist = playlist.tracks.some(track => track._id.equals(song._id));
        
        if (!isSongInPlaylist) {
            return res.status(400).json({ message: 'Song is not in the playlist' });
        }

        // Remove the song from the playlist
        const updatedUser = await User.findOneAndUpdate(
            { email, 'playlist.name': name },
            { $pull: { 'playlist.$.tracks': { _id: song._id } } },
            { new: true }
        );

        // Find the updated playlist instance and update it
        const playlistInstance = await Playlist.findOneAndUpdate(
            { _id: playlist._id },
            { $pull: { tracks: { _id: song._id } } },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Error removing song from playlist', details: err.message });
    }
};

const deletePlaylist = async (req, res) => {
    const { email } = req.params;
    const { name } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the playlist by name and remove it from the user's playlist array
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $pull: { playlist: { name } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        // Find the playlist instance by name
        const playlistToDelete = await Playlist.findOne({ name });

        if (!playlistToDelete) {
            return res.status(404).json({ error: "Playlist instance not found" });
        }

        // Remove the playlist instance from the Playlist collection
        await Playlist.findByIdAndDelete(playlistToDelete._id);

        res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting playlist', details: err.message });
    }
};


const updatePlaylistStatus = async (req, res) => {
    const { email } = req.params; // Assuming email is used to find the user
    const { name, new_status } = req.body; // The new status to update

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the new status is valid
        if (!['private', 'public'].includes(new_status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Find the playlist in the user's playlist array
        const playlistIndex = user.playlist.findIndex(pl => pl.name === name);
        if (playlistIndex === -1) {
            return res.status(404).json({ error: "Playlist not found in user's playlist" });
        }

        // Update the status in the user's playlist array
        const updatedUser = await User.findOneAndUpdate(
            { email, 'playlist.name': name },
            { $set: { 'playlist.$.status': new_status } },
            { new: true }
        );

        // Save the user document
        await user.save();

        // Update the playlist instance in the Playlist collection
        const updatedPlaylist = await Playlist.findOneAndUpdate(
            { name: name, user_id: user._id }, // Find playlist by name and user_id
            { $set: { status: new_status } },  // Update the status
            { new: true } // Return the updated document
        );

        if (!updatedPlaylist) {
            return res.status(404).json({ error: "Playlist not found in Playlist collection" });
        }

        // Respond with the updated playlist
        res.status(200).json(updatedPlaylist);

    } catch (err) {
        res.status(500).json({ error: 'Error updating playlist status', details: err.message });
    }
};



module.exports = { loginUser, signupUser, addFavorite, removeFavorite, createPlaylist, addToPlaylist, removeFromPlaylist, deletePlaylist, updatePlaylistStatus }