const controller = require('./../controllers/controller.js');
module.exports = (server) => {
    server.get('/', controller.home);
    server.get('/listPage', controller.listPage);
    server.post('/create', controller.create);
    server.post('/login', controller.login);
    server.post('/add', controller.add);
    server.post('/taskDone', controller.taskDone);
}
