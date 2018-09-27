const dataBase = require('../config/sql');
const factsApi = require('../config/factsApi');
module.exports = {
    home: (request, response) => {
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
            let user = await dataBase.getUsers(email);
            let currentUser = {
                name: user[0].name,
                email: user[0].email,
                userid: user[0].userid
            };
            request.session.user = currentUser;
            console.log(`current user is ${request.session.user.userid}`);
            response.redirect('listPage');
        } else {
            response.redirect('/');
        }
    },
    login: async (request, response) => {
        let email = request.body.email;
        let password = request.body.password;
        let user = await dataBase.login(email, password);
        if (user) {
            let currentUser = {
                name: user.name,
                email: user.email,
                userid: user.userid
            };
            request.session.user = currentUser;
            response.redirect('listPage');
        } else {
            response.redirect('/');
        }

    },
    listPage: async (request, response) => {
        if (request.session.user) {
            try {
                let factJson = await factsApi.getRandomFact();
                let fact = JSON.parse(factJson);
                let result = await dataBase.getlistForUser(request.session.user.userid);
                response.render('todo', { name: request.session.user.name, fact: fact.string, data: result });
            } catch (err) {
                response.render('todo', { name: request.session.user.name, data: '' });
            }
        } else {
            response.redirect('/');
        }
    },
    add: async (request, response) => {
        let input = request.body.added;
        if (!!input && input.length > 0) {
            console.log(input);
            try {
                await dataBase.addItemForUser(request.session.user.userid, input);
            } catch (err) {
                response.end();
            }
        } 
        response.redirect('listPage');
    },
    taskDone: async (request, response) => {
        console.log('ID was ' + request.body.id);
        await dataBase.markTaskDone(request.body.id);
        response.end();
    }
}