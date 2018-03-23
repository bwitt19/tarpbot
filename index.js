// index.js
// Author: Brendan Witt
// Description: index file for teambot's Node.js application

// Change as necessary (localhost port)
const HOSTPORT = 5000;

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(HOSTPORT, () => {  
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);});

app.post('/event', (req, res) => {
    if (req.body.type === 'url_verification') {
	res.send(q.challenge);
    }

    // Bot definition/activity
    
});
