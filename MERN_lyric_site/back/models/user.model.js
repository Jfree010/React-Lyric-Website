const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Song = require('./song.model')
const Playlist = require('./playlist.model')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorite: {
        type: [Song.Schema],
        default: []
    },
    playlist: {
        type: [Playlist.Schema],
        default: []
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) { //cannot be an arrow function ('this' won't work)
    //validation
    if(! email || !password) {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // what salt does adds extra text to password to make decrypting harder: password -> passwordaksdfjladskf
    const salt = await bcrypt.genSalt(10) //10 is default
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function(email, password) {
    //validation
    if(! email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password) //given password, hashed password

    if(!match) {
        throw Error('incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)