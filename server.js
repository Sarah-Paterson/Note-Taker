const express = require('express');
const path = require('path');
let notes = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid');
// const routes = require("./routes")
// require routes folder

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware for express router

app.use(express.static('public'));

// call index 

// html routes

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

// /api go into api routes
// modify using express router and cut paste

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter(note => id !== note.id);

  fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) =>
  err
    ? console.error(err)
    :res.json({message:"Note was successfully deleted"})
  );
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
