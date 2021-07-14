const path = require('path');
const router = require('express').Router();

// when the Get started button is clicked display the note.html Web page
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// If no matching route is found, then default to home
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
