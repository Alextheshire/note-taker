const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const db = require('./db/db.json')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes',(req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('/api/notes',(req,res) => 
    res.json(db))

app.post('./api/notes',(req,res) => {

})

app.get('*',(req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html')))


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);