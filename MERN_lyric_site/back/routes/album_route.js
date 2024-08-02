const router = require('express').Router();
const Album = require('../models/album.model');

router.route('/').get(async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        res.json(album);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
