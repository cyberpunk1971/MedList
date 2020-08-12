require('dontenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');

const app = express();

mongoose
.connect(DATABASE_URL, { useNewUrlParser: true}).then(result => {
    app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`)
    });
})