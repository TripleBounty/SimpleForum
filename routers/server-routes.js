const {
    Router,
} = require('express');

const attach = (app, data) => {
    // const homeController = require('../controllers/home-controller');
    const router = new Router();

    router.get('/', (req, res) => {
        data.getAllPosts()
            .then((posts) => {
                res.render('home', {
                    'posts': posts,
                });
            });
    });

    app.use('/', router);
};

module.exports = attach;