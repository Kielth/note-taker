const fs = require('fs');
const path = require('path');



function deleteNote(id, res, notes){
    //let notes = JSON.parse(notesIn);
    for (let i = 0; i < notes.length; i++){
        if (notes[i].id == id){
          notes.splice(i, "1");
          saveNotes(notes);
          console.log('File successfully deleted from: db.json');
          return res.status(200).end();
        }
      }
}

function saveNotes(notes) {
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
        if (err) {
            return console.log(err);
        }
  
        console.log("File successfully written to: db.json");
    });
  }

  function findId(notesIn){
    highestId = 0;
    if(notesIn.length == 0){
      highestId = 0;
    }else{
      for (let i = 0; i < notesIn.length; i++){
        if(notesIn[i].id > highestId){
          highestId = notesIn[i].id;
        }
      }
    }
    return highestId + 1;
  }

  module.exports = {saveNotes, deleteNote, findId};