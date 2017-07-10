const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();
    const postControler = require('../controllers/post-controller')(data);

    router.get('/', postControler.getAll);
    router.post('/increase-likes/:postId', postControler.updatePostById);
    router.get('/forum-post/:postId', postControler.getPostById);
    router.get('/new-forum-post', postControler.newPostForm);
    router.post('/new-forum-post', postControler.newPost);

    app.use('/', router);
};


module.exports = attach;
