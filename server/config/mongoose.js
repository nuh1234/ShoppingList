require('../models/model.js');
const mongo = require('mongoose');

mongo.connect('mongodb://localhost/login');

mongo.Promise = global.Promise;


