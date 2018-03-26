// index.js
// Author: Brendan Witt
// Description: index file for teambot's Node.js application
// (derived from a bot using Node.js and IBM Watson to analyze tone ->
//   https://github.com/girliemac/slack-sentiment/ )

// Change as necessary (localhost port)
const PORT = 5000;

// Set up dependencies
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Grabbed from a tutorial -- I'm learning this on the fly:
 * https://evanhahn.com/understanding-express/
 * https://api.slack.com/tutorials/tunneling-with-ngrok
 */

// // We create a function which handles any requests and sends a simple response
// function handleRequest(request, response){
//   response.end('Ngrok is working! -  Path Hit: ' + request.url);
// }
//
// var serverA = http.createServer(handleRequest);
//
// // Finally we start the server
// serverA.listen(PORT, function(){
//   // Callback triggered when server is successfully listening. Hurray!
//   console.log("Server listening on: http://localhost:%s", PORT);
// });


// POST request
app.post('/', (req, res) => {
    let q = req.body;

    // If request is not coming from Slack (check token)
    if (q.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    	res.sendStatus(400);
    	return;
    }

    // Respond to Slack's URL verification request with given challenge value
    if (q.type === 'url_verification') {
    	res.send(q.challenge);
    }
    // Events - get message text
    else if (q.type === 'event_callback') {
        // If no text, return
    	if (!q.event.text) return;

        // Exclude bot messages and slash commands
        let regex = /(^\/)/;
        if (q.event.subtype === 'bot_message' || regex.test(q.event.text)) return;

    	analyzeTone(q.event); // Defined below: tone analysis
        res.sendStatus(200);
    }

});

function analyzeTone(event) {
    // To be defined -- Watson tone analysis occurs here
}

// Sample GET method (requires at least one)
app.get('/', function(req, res) {
    res.end('Ngrok OK! - Path hit: ' + req.url)
});


// Start server at given PORT
const server = app.listen(PORT, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
