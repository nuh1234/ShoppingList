const dataBase = require('../config/sql');
let currentUser;
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
            currentUser = {
                name: user[0].name,
                email: user[0].email,
                id: user[0].id
            }
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
            currentUser = {
                name: user.name,
                email: user.email,
                id: user.id
            }
            response.redirect('listPage');
        } else {
            response.redirect('/');
        }

    },
    listPage: async (request, response) => {
        if (currentUser) {
            try {
                let result = await dataBase.getlistForUser(currentUser.userid);
                response.render('todo', { name:currentUser.name, data: result });
            } catch (err) {
                response.render('todo', { name:currentUser.name, data: '' });
            }
        } else {
            response.redirect('/');
        }
    },
    add: async (request, response) => {
        let input = request.body.added;
        if (!!input && input.length > 0) {
            console.log(input);
            await dataBase.addItemForUser(currentUser.userid, input);
        } 
        response.redirect('listPage');
    },
    taskDone: async (request, response) => {
        console.log('ID was ' + request.body.id);
        await dataBase.markTaskDone(request.body.id);
        response.end();
    }
}