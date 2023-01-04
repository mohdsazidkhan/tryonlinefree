require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const PORT = process.env.SERVER_PORT
const MONGODB_URL = process.env.MONGO_URI
const routes = require('./routes/routes');
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname+'/.env'});
}
mongoose.set("strictQuery", false);
var bodyParser = require('body-parser')

mongoose.connect(MONGODB_URL, () => {
  console.log("MongoDB Connected Successfully!");
});

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', routes)
app.use(express.json());

app.use(express.static('public'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`API Server is running on ${PORT}`)
}) 