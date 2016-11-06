'use strict';

let simpleNodeLogger = require('simple-node-logger');
let log = simpleNodeLogger.createRollingFileLogger({
    "logDirectory": __dirname + "/public/.",
    "fileNamePattern": "app-<DATE>.log",
    "dateFormat": "YYYY-MM-DD"
});

let express = require('express');
let app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send('hello world');
});

app.post('/webhook', function(req, res, next) {
    log.info(JSON.stringify(req.body));
    res.send('ok');
});

app.get('/auth', function(req, res, next) {
    let code = req.query.code;
    res.send('ok');
});

app.listen(app.get('port'), function() { console.log('Node app is running on port', app.get('port')); });

