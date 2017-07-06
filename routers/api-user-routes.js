const { Router } = require('express');

const attach = (app, data) => {
    // const homeController = require('../controllers/home-controller');
    const router = new Router();

    router.get('/login', (req, res) => {
        console.log(data);
        res.render('home');
    });

    app.use('/api/users/', router);
};

module.exports = attach;
