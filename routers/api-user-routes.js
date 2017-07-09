const { Router } = require('express');

const attach = (app, data) => {
    const userController = require('../controllers/user-controller')(data);

    const router = new Router();

    router.get('/login', userController.login);
    router.post('/login', userController.signIn);
    router.get('/register', userController.registerForm);
    router.post('/register', userController.register);
    router.get('/profile', userController.profile);
    router.get('/logout', userController.logout);

    app.use('/api/users/', router);
};

module.exports = attach;
