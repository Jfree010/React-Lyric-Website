const router = require('express').Router();
const Karaoke = require('../models/karaoke.model');
const mongoose = require('mongoose');

router.route('/').get(async (req, res) => {
    try {
        const lyrics = await Karaoke.find();
        res.json(lyrics);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/:title').get(async (req, res) => {
    try {
        const doc = await Karaoke.find({ title: req.params.title });
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
