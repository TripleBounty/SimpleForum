module.exports = (data) => {
    const userController = require('./user-controller')(data);
    const postController = require('./post-controller')(data);
    const commentController = require('./comment-controller')(data);
    const chatController = require('./chat-room-controller')(data);

    const controller = {
        userController,
        postController,
        commentController,
        chatController,
    };

    return controller;
};
