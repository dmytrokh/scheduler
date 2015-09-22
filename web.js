var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(express.static("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
