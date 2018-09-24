const dataBase = require('../config/sql');
const list = ['item 1', 'item 2', 'item 3'];

module.exports = {
    home: (request, response) => {
        // TODO look at session stoarge for current user
        // Server side rendering of index page
        response.render('index', { page:'Home uyubiybuygb' });
    },
    create: (request, response) => {
        console.log('create');
        let created = dataBase.createUser('Nuh Mohamud', 'nuh@gmail.com', 'password');
        if (created) {
            response.redirect('listPage');
        } else {
            response.redirect('/');
        }
    },
    login: (request, response) => {
        console.log('login');
        let loggedIn = dataBase.login2('nuh@gmail.com', 'password');
        
        if (loggedIn) {
            response.redirect('listPage');
        } else {
            response.redirect('/');
        }

    },
    listPage: (request, response) => {
        response.render('todo', {data: list});
    },
    add: (request, response) => {
        let input = request.body.added;
        if (!!input && input.length > 0) {
            console.log(input);
            list.push(input)
        } 
        response.redirect('listPage');
    }
}