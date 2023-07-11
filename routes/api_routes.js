let notes = require('../db/db.json');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const router = require('express').Router();

router.get('/', (req, res) => res.status(200).json(notes));

router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    notes.push(newNote);

    fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) =>
    err
      ? console.error(err)
      : res.json(newNote)
  );

  } else {
    res.status(400).json('Invalid data, please fix and try again.');
  }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => id !== note.id);
  
    fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) =>
    err
      ? console.error(err)
      :res.json({message:"Note was successfully deleted"})
    );
});

module.exports = router;