const mongo = require('mongoose');
const user = mongo.model('User');

module.exports = {
    home: (request, response) => {
        // Server side rendering of index page
        response.render('index');
    },
    create: (request, response) => {
        console.log('create');
        
        response.end();
    },
    login: (request, response) => {
        console.log('login');
        response.end();
    }
}