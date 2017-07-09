const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();
    const postControler = require('../controllers/post-controller')(data);

    router.get('/', postControler.getAll);
    router.post('/vote', postControler.updatePostById);
    router.get('/forum-post/:postId', postControler.getPostById);

    app.use('/', router);
};


module.exports = attach;
