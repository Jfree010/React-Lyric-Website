const fs = require('fs');
const path = require('path');
const Karaoke = require('../models/karaoke.model'); // Import the Karaoke model from karaoke.model.js

//lyrics; https://metalstorm.net/bands/lyrics.php?album_id=94505&band_id=10142&bandname=

// Function to process a single text file
function processTextFile(filePath) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    const documents = lines.map((line, index) => {
        const karaokeLine = new Karaoke({
            title: 'TOREPLACE',
            line: line,
            begin: [0],
            end: [index],
            duration: ['0s'],
            overlapped: 0,
            overlap: {
                with: [],
                delay: [],
                color: []
            }
        });
        return JSON.stringify(karaokeLine, null, 1);
    });
    return documents;
}

// Function to process all text files in a folder
function processTextFilesInFolder(folderPath, resultPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        files.forEach(file => {
            if (path.extname(file) === '.txt') {
                const filePath = path.join(folderPath, file);
                const documents = processTextFile(filePath);
                const outputFileName = file.replace('.txt', '_result.json');
                const resultFilePath = path.join(resultPath, outputFileName);
                const result = `[\n${documents.join(',\n')}\n]`;
                fs.writeFileSync(resultFilePath, result);
                console.log(`Result for ${file} saved to ${resultFilePath}`);
            }
        });
    });
}

const folderPath = './k_lyrics'; // Replace with the path to your folder
const resultPath = './k_schemas';
processTextFilesInFolder(folderPath, resultPath);
