const express = require('express');
const router = require('express').Router();
const notes = require('../../db/db.json');
const fs = require('fs');
const path = require('path');
const { deleteNote, findId } = require('../../utils/data');

router.use(express.json());

// let currentID = notes.length;

router.delete("/notes/:id", (req, res) => {
  let noteId = req.params.id;
  deleteNote(noteId, res, notes);
}) 

router.post("/notes", (req, res) => {
  let newNote = req.body;
  // let newId = currentID + 1;
  // currentID++;
  newNote["id"] = findId(notes);
  notes.push(newNote);
  saveNotes();
  return res.status(200).end();
})

router.get("/notes", (req,res) => {
  return res.json(notes);
});

function saveNotes() {
  fs.writeFile(path.join(__dirname , "../../db/db.json"), JSON.stringify(notes), function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("File successfully written to: db.json");
  });
}

module.exports = router;
