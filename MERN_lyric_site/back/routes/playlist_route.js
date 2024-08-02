const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist.model');

router.route('/:id/:name').get(async (req, res) => {
    try {
        const { id, name } = req.params;
        const playlist = await Playlist.findOne({ name, user_id: id });
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.status(200).json(playlist);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving playlist', details: err.message });
    }
});

router.route('/').get(async (req, res) => {
    try {
        const publicPlaylists = await Playlist.find({ status: 'public' });
        res.status(200).json(publicPlaylists);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving public playlists', details: err.message });
    }
});

module.exports = router;
