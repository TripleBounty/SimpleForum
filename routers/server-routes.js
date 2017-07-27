const { Router } = require('express');

const attach = (app, controllers) => {
    const router = new Router();

    const postController = controllers.postController;
    const userController = controllers.userController;
    const commentController = controllers.commentController;
    const chatController = controllers.chatController;

    router.get('/', postController.getAll);
    router.post('/upload', userController.uploadAvatar);
    router.post('/vote', postController.updatePostById);
    router.get('/forum-post/:postId', postController.getPostById);
    router.get('/new-forum-post', postController.newPostForm);
    router.post('/new-forum-post', postController.newPost);
    router.post('/comment', commentController.newComment);
    router.get('/comment', commentController.showComment);
    router.get('/chat-room', chatController.showRoom);

    app.use('/', router);
};

module.exports = attach;
