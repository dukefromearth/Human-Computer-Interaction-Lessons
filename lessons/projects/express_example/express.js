var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Yay!');
});

app.listen(3000);