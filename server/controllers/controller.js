const dataBase = require('../config/sql');

module.exports = {
    home: (request, response) => {
        // TODO look at session stoarge for current user
        // Server side rendering of index page
        response.render('index', {  });
    },
    create: async (request, response) => {
        console.log('create');
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let created = await dataBase.createUser(name, email, password);
        if (created) {
            response.redirect('listPage');
        } else {
            response.redirect('/');
        }
    },
    login: async (request, response) => {
        let email = request.body.email;
        let password = request.body.password;
        let loggedIn = await dataBase.login(email, password);
        if (loggedIn) {
            response.redirect('listPage');
        } else {
            response.redirect('/');
        }

    },
    listPage: async (request, response) => {
        let result = await dataBase.getlistForUser('0');
        response.render('todo', {data: result});
    },
    add: async (request, response) => {
        let input = request.body.added;
        if (!!input && input.length > 0) {
            console.log(input);
            await dataBase.addItemForUser('0', input);
        } 
        response.redirect('listPage');
    }
}