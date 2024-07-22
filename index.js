const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./db.js'); // Import ฟังก์ชันเชื่อมต่อ
const flashcardModel = require('./Model/flashcard.js');
const PORT = 8000;
const app = express();


connectDB(); // เรียกใช้ฟังก์ชันเชื่อมต่อ

app.use(express.json());

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})

app.get('/flash_info', async (req, res) => {
    console.log("Request received for /flash_info");
    try {
        const flash_info = await flashcardModel.find();
        res.json(flash_info);
      } catch (err) {
        console.error(err); // แสดง error ใน console
        res.status(500).json({ message: 'Server Error' });
      }
    });

    app.post('/add_flashcard', async (req, res) => {
        try {
            const newFlashcard = new flashcardModel(req.body);
            await newFlashcard.save();
            res.status(201).json({ message: 'Flashcard added successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    });