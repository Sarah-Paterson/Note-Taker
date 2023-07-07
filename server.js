const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => res.status(200).json(notes));

app.post('/api/notes', (req, res) => {
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

app.delete('/api/notes/:id', (req, res) => {
  // read db.json (get all notes)
  console.log(notes)
  // once we have the array of objects, iterate though and remove one with matching id (for loop?) (filter? = better)
  const updatedNotes = notes.filter()

  console.log(updatedNotes)
  // once we have the deleted note array, then re-write file 
  // fs.writeFile(`./db/db.json`, JSON.stringify(updatedNotes), (err) =>
  // err
  //   ? console.error(err)
  //   : res.json(newNote)
  // );

  res.json("it's all good and new");
  console.info(`${req.method} request received to remove a note`);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
