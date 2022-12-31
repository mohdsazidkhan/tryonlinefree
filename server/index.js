require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const PORT = process.env.SERVER_PORT
const MONGODB_URL = process.env.MONGO_URI
const routes = require('./routes/routes');
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

app.listen(PORT, () => {
    console.log(`API Server is running on ${PORT}`)
})