const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    "user": String,
    "Set_name": String,
    "front": String,
    "back": String
});

const flashcardModel = mongoose.model("Flashcard", flashcardSchema, "flashcard_info");

module.exports = flashcardModel;