const router = require('express').Router();
const { createNewNote, validateNote, randomId } = require('../../lib/notes');
let {notes} = require('../../db/db');
const fs = require("fs");
const path = require('path');

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

// delete route for the notes db
router.delete("/notes/:id", function (req, res) {
  try {
    notes = notes.filter(function (note) {
      return note.id != req.params.id;
    });
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes }, null, 2));
    res.json(notes);
  } 
  catch (err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;