const mongoose = require('mongoose')
const Song = require('../models/song.model')
const fs = require('fs').promises
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function connectToDatabase() {
    try {
        // MongoDB connection URI
        const uri = process.env.ATLAS_URI; // Replace with your MongoDB URI
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Other options as needed
        };

        // Connect to MongoDB
        await mongoose.connect(uri, options);
        console.log('Connected to MongoDB');

        // Call the function to read the JSON file and process data
        await importSong();

        // Disconnect from MongoDB after processing
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function importSong() {
    try {

        const songInstance = new Song({
            title: "Nobody Can Save Me",
            album: "One More Light",
            image: "/assets/images/omlimg.jpg",
            musicLink: "FY9v147BZuE",
            // videoLink: "Tm8LGxTLtQk",
            trackLink: "none",
            length: 269,
            
            })
            await songInstance.save()

        console.log('Song imported successfully.');
    } catch (error) {
        console.error('Error importing Song:', error);
    }
}

// Call the function to start importing
connectToDatabase();