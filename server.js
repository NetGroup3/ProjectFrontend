
const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(__dirname + '/angular-build'));
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, 'angular-build', 'index.html'))
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8081);

/*
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/NetProjectFrontend'));

app.get('/!*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/NetProjectFrontend/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
*/
