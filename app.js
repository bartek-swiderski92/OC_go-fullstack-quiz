const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({
        message: 'sucess!'
    })
})

module.exports = app;