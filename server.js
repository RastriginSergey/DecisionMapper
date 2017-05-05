const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res, next) => {
    res.render('index.html');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Example app listening on port:', PORT);
});
