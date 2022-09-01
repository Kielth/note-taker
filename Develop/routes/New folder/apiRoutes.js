const express = require('express');
const router = require('express').Router();
const notes = require('../db/db.json');
// const dataUtlis = require ('../utils/data');
// const dataTools = dataUtlis();
//const {saveNotes} = require('../../utils/data');

router.use(express.json());

let currentID = notes.length;

router.delete("/notes/:id", (req, res) => {
  for (let i = 0; i < notes.length; i++){
    if (notes[i].id == req.params.id){
      notes.splice(i, "1");
      saveNotes();
      console.log('File successfully deleted from: db.json');
      return res.status(200).end();
    }
  }
}) 

router.post("/notes", (req, res) => {
  let newNote = req.body;
  let newId = currentID + 1;
  currentID++;
  newNote["id"] = newId;
  notes.push(newNote);
  saveNotes();
  return res.status(200).end();
})

router.get("/notes", (req,res) => {
  return res.json(notes);
});

function saveNotes() {
  fs.writeFile("../db/db.json", JSON.stringify(notes), function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("File successfully written to: db.json");
  });
}

module.exports = router;
