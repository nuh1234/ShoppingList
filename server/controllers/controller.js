const sql = require('../config/sql');
const list = ['item 1', 'item 2', 'item 3'];

module.exports = {
    home: (request, response) => {
        // Server side rendering of index page
        response.render('index', { page:'Home uyubiybuygb' });
    },
    create: (request, response) => {
        console.log('create');

        response.end();
    },
    login: (request, response) => {
        console.log('login');
        response.redirect('listPage');
    },
    listPage: (request, response) => {
        response.render('todo', {data: list});
    },
    add: (request, response) => {
        let input = request.body.added;
        if (!!input) {
            console.log(input);
            list.push(input)
        } 
        response.redirect('listPage');
    }
}