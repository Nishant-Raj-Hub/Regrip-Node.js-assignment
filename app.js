const express = require('express');
const app = express();
const notesRouter = require('./src/routes/notes');

app.use(express.json());


// Routes
app.use('/notes', notesRouter);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});