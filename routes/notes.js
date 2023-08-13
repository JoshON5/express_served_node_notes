const note = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

note.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
})

note.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`New Note! New Goals!`);
    } else {
        res.error('Too bad we could not make a note to fix this error :/')
    }
});

note.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json').then((data) => JSON.parse(data)).then(json => {
        const newDb = json.filter((note) => note.id !== noteId);

        writeToFile('./db/notes.json', newDb);

        res.json(`Note ${noteId} has been deleted! Congratualations!`)
    })
})

module.exports = note;