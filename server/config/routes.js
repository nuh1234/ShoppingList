const controller = require('./../controllers/controller.js');

module.exports = (server) => {
    server.get('/', controller.home);
    server.post('/create', controller.create);
    server.post('/login', controller.login);
}
