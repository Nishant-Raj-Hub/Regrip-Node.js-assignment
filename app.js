const express = require('express');
const app = express();
const notesRouter = require('./src/routes/notes');

require('dotenv').config()
app.use(express.json());


// Routes
app.use('/notes', notesRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});