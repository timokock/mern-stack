const notesCtrl = {}

const Note = require('../models/Note')

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
}

notesCtrl.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote =  new Note({
        title,
        content,
        date,
        author
    })
    await newNote.save()
    res.json('Note Saved')
}
notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note)
}

notesCtrl.updateNote = async (req, res) => {
    const { title, content, author, date } = req.body
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        content,
        date,
        author
    });
    console.log(req.params.id);
    
    res.json('Note Updated')
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json('Note Deleted')
}


module.exports = notesCtrl