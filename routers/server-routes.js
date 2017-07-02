const { Router } = require('express');

const attach = (app) => {
    // const homeController = require('../controllers/home-controller');
    const router = new Router();

    router.get('/', (req, res) => {
        res.render('home');
    });

    app.use('/', router);
};

module.exports = attach;
