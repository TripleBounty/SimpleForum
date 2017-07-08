const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();
    const postControler = require('../controllers/forum-post-controller')(data);

    router.get('/', postControler.getAll);
    router.get('/increase-likes/:postId', postControler.updatePostById);
    router.get('/forum-post/:postId', postControler.getPostById);

    app.use('/', router);
};


module.exports = attach;
