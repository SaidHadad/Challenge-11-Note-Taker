const router = require('express').Router();
const { notes } = require('../../db/db');

// api call response for the notes, an having results sent to browser in the form of an array of object
router.get("/notes", function (err, res) {
  try {
    createNoteData = fs.readFileSync("db/db.json", "utf8");
    console.log("Hello from the SERVER!");
    createNoteData = JSON.parse(createNoteData);
  } catch (err) {
    console.log("\n error (catch err app.get):");
    console.log(err);
  }
  res.json(createNoteData);
});

router.get("/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});

module.exports = router;