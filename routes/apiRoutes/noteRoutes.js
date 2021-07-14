const router = require('express').Router();
const { createNewNote, validateNote, randomId } = require('../../lib/notes');
const { notes } = require('../../db/db');
const fs = require("fs");

// get route for the notes
router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

// post route for the notes
router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = randomId();

  if (!validateNote(req.body)) {
    res.status(400).send('Wrong format');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// delete route for notes
router.delete('/notes/:id', (req, res) => {
    const deleteNote = notes.findIndex((note) => note.id === req.params.id);

    //splice the note
    notes.splice(deleteNote, 1);

    //update array after note got delated
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2), function(err) {
        if (err) throw err;
    });
    res.json(deleteNote);
});

module.exports = router;