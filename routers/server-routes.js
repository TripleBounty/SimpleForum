const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();
    const postControler = require('../controllers/post-controller')(data);
    const userControler = require('../controllers/user-controller')(data);
    const commentController = require('../controllers/comment-controler')(data);

    router.get('/', postControler.getAll);
    router.post('/upload', userControler.uploadAvatar);
    router.post('/vote', postControler.updatePostById);
    router.get('/forum-post/:postId', postControler.getPostById);
    router.get('/new-forum-post', postControler.newPostForm);
    router.post('/new-forum-post', postControler.newPost);
    //router.post('/comment', commentController.newPost);
    router.get('/comment', commentController.showComment);

    app.use('/', router);
};

module.exports = attach;
