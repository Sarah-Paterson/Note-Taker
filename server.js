const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
// const uuid = require('./helpers/uuid');

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
      // id: uuid(),
    };

    notes.push(newNote);

    fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) =>
    err
      ? console.error(err)
      : console.log(`Note for ${newNote.title} has been written to JSON file`)
  );

  } else {
    res.status(400).json('Invalid data, please fix and try again.');
  }
});

app.delete('/api/notes/:id', (req, res) => {
  res.json(notes);
  console.info(`${req.method} request received to remove a note`);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
