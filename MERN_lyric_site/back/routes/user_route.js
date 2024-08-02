const express = require('express')
const User = require('../models/user.model')


//controller functions

const { loginUser, signupUser, addFavorite, removeFavorite, createPlaylist, addToPlaylist, removeFromPlaylist, deletePlaylist, updatePlaylistStatus } = require('../controllers/userController');

const router = express.Router()

router.route('/:email').get(async (req, res) => {
    try {
        const doc = await User.findOne({ email: req.params.email });
        res.status(200).json(doc);;
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

//login route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signupUser)

//add to favorites
router.patch('/:email/add', addFavorite)

//remove from favorites
router.patch('/:email/delete', removeFavorite)

//create playlist
router.patch('/:email/pcreate', createPlaylist)

//add to playlist
router.patch('/:email/padd', addToPlaylist)

//remove from playlist
router.patch('/:email/premove', removeFromPlaylist)

//delete playlist
router.patch('/:email/pdelete', deletePlaylist)

//update status
router.patch('/:email/statuschange', updatePlaylistStatus)

module.exports = router