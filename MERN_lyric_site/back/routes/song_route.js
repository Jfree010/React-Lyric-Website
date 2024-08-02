const router = require('express').Router();
const Song = require('../models/song.model');
const mongoose = require('mongoose');

router.route('/').get(async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/:title').get(async (req, res) => {
    try {
        const doc = await Song.findOne({ title: req.params.title });
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
