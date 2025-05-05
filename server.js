const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/contacts', contactRoutes);

app.get('/', (req, res) => {
    res.send('Сервер работает!');
  });
  

mongoose.connect('mongodb://localhost:27017/contact-manager')
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to MongoDB`);
        });
    })
    .catch(err => console.error('Error connecting MongoDB', err));