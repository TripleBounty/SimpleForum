const { Router } = require('express');

const attach = (app, data) => {
    const userController = require('../controllers/user-controller')(data);

    const router = new Router();

    router.get('/login', userController.login);
    app.post('/login', userController.register);
    app.get('/profile', userController.profile);
    app.get('/logout', userController.logout);

    app.use('/api/users/', router);
};

module.exports = attach;
