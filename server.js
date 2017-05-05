const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const engine = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res, next) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Example app listening on port:', PORT);
});
