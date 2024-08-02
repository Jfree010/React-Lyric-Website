const router = require('express').Router();
const kTracks = require('../models/kTracks.model');
const mongoose = require('mongoose');

router.route('/').get(async (req, res) => {
    try {
        const lyrics = await kTracks.find();
        res.json(lyrics);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/:title').get(async (req, res) => {
    try {
        const doc = await kTracks.find({ title: req.params.title });
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
