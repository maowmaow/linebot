'use strict';

let config = require('config');
let simpleNodeLogger = require('simple-node-logger');
let log = simpleNodeLogger.createRollingFileLogger(config.logger);

let express = require('express');
let app = express();
app.use(express.static('public'));

let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send('hello world');
});

app.post('/webhook', function(req, res, next) {
    log.info(JSON.stringify(req.body));
    res.send('ok');
});

let http = require('http').Server(app);
http.listen(config.port);


