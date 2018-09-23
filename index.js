const express = require('express');
const path = require('path');
const session = require('express-session');
const parser = require('body-parser');
const dataBase = require('mongoose');
require('./server/config/mongoose.js');
const port = process.env.PORT || 5000;
const server = express();

server.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
server.use(parser.urlencoded({ extended: false }));
server.use(parser.json());
// References static files such as css and images, points directly to those folders
server.use(express.static(path.join(__dirname, './statics')));
server.use(express.static(path.join(__dirname, 'public')));

server.set('views', path.join(__dirname, './views'));

// Telling the server to use ejs
server.set('view engine', 'ejs');

require('./server/config/routes.js')(server);

server.listen(port, () => {
    console.log('listening on port 5000');
});
