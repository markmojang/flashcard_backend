const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const connectDB = require('./db.js'); // Import ฟังก์ชันเชื่อมต่อ
const flashcardModel = require('./Model/flashcard.js');
const PORT = 8000;
const app = express();


connectDB(); // เรียกใช้ฟังก์ชันเชื่อมต่อ

app.use(express.json());
app.use(cors()); 

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})

app.use(cors(
//     {
//     origin: 'localhost:3000', // Replace with your frontend's origin
//     methods: ['GET', 'POST'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   }
));
  

app.get('/flash_info', async (req, res) => {
    console.log("Request received for /flash_info");
    try {
        const setName = req.query.Set_name; // Get Set_name from query
        const user = req.query.user;
        let query = {};
        if (setName) {
            query.Set_name = setName; // Add filter if Set_name is provided
        }
        if (user){
            query.user = user;
        }
        const flash_info = await flashcardModel.find(query);
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

app.delete('/delete_flashcard', async (req, res) => {
    try {
      const { user, Set_name, front, back } = req.query; 
      console.log(user,Set_name, front, back);
      const deletedFlashcard = await flashcardModel.findOneAndDelete({
        user: user,
        Set_name: Set_name,
        front: front,
        back: back
      });
  
      if (!deletedFlashcard) {
        return res.status(404).json({ message: 'Flashcard not found' });
      }
      else{
      res.status(200).json({ message: 'Flashcard deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.delete('/delete_set', async (req, res) => {
    try {
      const { user, Set_name } = req.query; 
  
      const filter = {};
      filter["user"] = user;
      filter["Set_name"] = Set_name; 
  
      const result = await flashcardModel.deleteMany(filter);
      
      res.json({ message: `${result.deletedCount} data deleted` });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  