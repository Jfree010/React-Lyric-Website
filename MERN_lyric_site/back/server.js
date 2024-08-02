const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 75000,
  serverSelectionTimeoutMS: 45000
}
mongoose.set('strictQuery', false)
mongoose.connect(uri, options)
        .then((result)=>console.log("connected to db"))
        .catch((err)=>console.log(err))

app.get('', (req, res)=>{
    res.send('Hello To the Backend!')
  })

const albumRouter = require('./routes/album_route')
app.use('/albums', albumRouter)

const songRouter = require('./routes/song_route')
app.use('/songs', songRouter)

const karaokeRouter = require('./routes/karaoke_route')
app.use('/karaokes', karaokeRouter)

const kTracksRouter = require('./routes/kTracks_route')
app.use('/kTracks', kTracksRouter)

const userRouter = require('./routes/user_route')
app.use('/user', userRouter)

const PlaylistRouter = require('./routes/playlist_route')
app.use('/playlist', PlaylistRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})