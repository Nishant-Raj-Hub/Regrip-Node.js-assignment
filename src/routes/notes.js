const express = require('express');
const router = express.Router();
let notes = require('../data/notes');

//I'VE MENTIONED COMMENTS FOR EASY UNDERSTANDING


// Create a new note
router.post('/', (req, res) => {
    const { title, content, tags } = req.body;
    const id = notes.length + 1;
    const newNote = { id, title, content, tags: tags || [] };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Retrieve all notes
router.get('/', (req, res) => {
    res.json(notes);
});

// Retrieve a single note by its ID
router.get('/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');
    res.json(note);
});

// Update a note by its ID
router.put('/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');

    const { title, content, tags } = req.body;
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;

    res.json(note);
});

// Delete a note by its ID
router.delete('/:id', (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
    if (noteIndex === -1) return res.status(404).send('Note not found');

    notes.splice(noteIndex, 1);
    res.status(204).send(removedNote);
});





//MANAGING TAGS

// Add tags to a note
router.put('/:id/tags', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');

    const { tags } = req.body;
    if (!tags || !Array.isArray(tags)) return res.status(400).send('Tags must be an array of strings');

    note.tags = [...new Set([...note.tags, ...tags])]; // Avoid duplicate tags
    res.json(note);
});

// Remove tags from a note
router.delete('/:id/tags', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');

    const { tags } = req.body;
    if (!tags || !Array.isArray(tags)) return res.status(400).send('Tags must be an array of strings');

    note.tags = note.tags.filter(tag => !tags.includes(tag));
    res.json(note);
});




//COMPLEX QUERYING

// Retrieve notes based on a logical tag query
router.post('/query', (req, res) => {
    console.log('Query endpoint hit');
    const { query } = req.body;
    console.log('Received query:', query);

    const result = notes.filter(note => {
        let matches = true;

        if (query.AND) {
            matches = matches && query.AND.every(tag => note.tags.includes(tag));
        }
        
        if (query.OR) {
            matches = matches && query.OR.some(tag => note.tags.includes(tag));
        }
        
        if (query.NOT) {
            matches = matches && !query.NOT.some(tag => note.tags.includes(tag));
        }

        return matches;
    });

    console.log('Filtered results:', result);
    res.json(result);
});




module.exports = router;