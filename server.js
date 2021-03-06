const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
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

app.post('/api/notes',(req,res) => {
    const id = uuidv4()
    const {title,text} = req.body
    if(req.body) {
        const newNote = {
            title,
            text,
            id
        }
        db.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(db,null,4))
        res.json('Success')
    } else {
        res.error('Error in adding note');

    }
})

app.delete('/api/notes/:noteId',(req,res) => {{

    for (i=0; i<db.length; i++) {
        if(db[i].id == req.params.noteId) {
            db.splice(i,1)
            fs.writeFileSync('./db/db.json', JSON.stringify(db,null,4))
            return res.json('Success')
        }
    }
    res.error("No note found with that ID")
}
})

app.get('*',(req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html')))


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);