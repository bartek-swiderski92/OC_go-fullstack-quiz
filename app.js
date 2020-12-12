const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('resuest received!');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({
        message: 'sucess!'
    });
    next();
});

app.use((req, res, next) => {
    console.log('response sent sucessfuly!');
})

module.exports = app;