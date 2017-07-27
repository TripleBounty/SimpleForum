const { Router } = require('express');

const attach = (app, controllers) => {
    const userController = controllers.userController;

    const router = new Router();

    router.get('/login', userController.login);
    router.post('/login', userController.signIn);
    router.get('/register', userController.registerForm);
    router.post('/register', userController.register);
    router.get('/update', userController.updateForm);
    router.post('/update', userController.update);
    router.get('/update_password', userController.updatePasswordForm);
    router.post('/update_password', userController.updatePassword);
    router.get('/profile', userController.profile);
    router.get('/profile/:username', userController.getUserProfile);
    router.get('/logout', userController.logout);

    app.use('/api/users/', router);
};

module.exports = attach;
