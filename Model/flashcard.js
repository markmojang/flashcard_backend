const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    "user": String,
    "Set_name": String,
    "front": String,
    "back": String
});

const flashcardModel = mongoose.model("flashcard_info", flashcardSchema);

module.exports = flashcardModel;