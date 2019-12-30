/*
 * @Author: qiuziz
 * @Date: 2017-06-14 16:32:44
 * @Last Modified by: qiuziz
 * @Last Modified time: 2017-06-15 10:09:15
 */

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/dishes', require('./node/router/dishes'));


const port = process.env.PORT || 3422;


app.use(express.static('src'));

http.createServer(app).listen(port);