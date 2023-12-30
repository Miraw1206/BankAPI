// app.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Change this to your desired port

app.use(bodyParser.json());

const dataPath = path.join(__dirname, 'data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const usersRouter = require('./router/users');
app.use('/users', usersRouter);

app.use((req, res, next) => {
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        next();
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
