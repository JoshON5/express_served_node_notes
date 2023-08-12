const note = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

note.get('/', (req, res) => {
    readFromFile('./Develop/db/notes.json').then((data) => res.json(JSON.parse(data)));
})

note.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            text_id: uuidv4(),
        };

        readAndAppend(newNote, './Develop/db/notes.json');
        res.json(`New Note! New Goals!`);
    } else {
        res.errored('Too bad we could not make a note to fix this error :/')
    }
});

module.exports = note;