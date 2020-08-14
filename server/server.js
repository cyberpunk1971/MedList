//require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');
const medicationsRoute = require('./routes/medications');
const usersRoute = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use('/api/medications', medicationsRoute);
app.use('/api/users', usersRoute);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headersSend) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.use(express.json({extended: false}));

// app.use('/api/users', require('./routes/registration'));
// app.use('/api/users', require('./routes/login'));


//app.listen(5000);
let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, {useNewUrlParser: true}, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}
function closeServer() {
    return new Promise((resolve, reject) => {
        mongoose.disconnect()
        .then(() => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}
if (require.main === module) {
    runServer()
    .catch(err => console.error(err));
}
module.exports = { app, runServer, closeServer};


// mongoose
// .connect(DATABASE_URL, { useNewUrlParser: true})
// .then(result => {
//     app.listen(PORT, () => {
//         console.log(`Your app is listening on port ${PORT}`);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// });