const path = require('path');
const express = require('express');
const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');

router.use(express.json());

let currentID = notes.length;

router.delete("/api/notes/:id", (req, res) => {
  for (let i = 0; i < notes.length; i++){
    if (notes[i].id == req.params.id){
      notes.splice(i, "1");
      saveNotes();
      console.log('Note successfully deleted from: db.json');
      return res.status(200).end();
    }
  }
}) 

router.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let newId = currentID + 1;
  currentID++;
  newNote["id"] = findId(notes);
  notes.push(newNote);
  saveNotes();
  return res.status(200).end();
})

router.get("/api/notes", (req,res) => {
  return res.json(notes);
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

function saveNotes() {
  fs.writeFile("../note-taker/Develop/db/db.json", JSON.stringify(notes), function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("File successfully written to: db.json");
  });
}

function findId(arrayIn){
  highestId = 0;
  for (let i = 0; i < notes.length; i++){
    if(arrayIn[i].id > highestId){
      highestId = arrayIn[i].id;
    }
  }
  return highestId + 1;
}

module.exports = router, notes;


