module.exports = (data) => {
    function getPostById(req, res) {
        const id = req.params.postId;

        data.posts.findById(id)
            .then((post) => {
                res.render('forum-post', {
                    post,
                });
            });
    }

    function getAll(req, res) {
        let isAutenticated = false;
        let user;
        if (req.isAuthenticated()) {
            user = req.user;
            isAutenticated = true;
        }
        data.posts.getAll()
            .then((posts) => {
                res.render('home', {
                    'user': user,
                    'isAutenticated': isAutenticated,
                    'posts': posts,
                });
            });
    }

    function updatePostById(req, res) {
        const postId = +req.body.postId;
        const node = +req.body.node;
        data.posts.updateLikes(postId, node)
            .then(() => {
                res.send(200);
            });
    }

    return {
        getPostById,
        getAll,
        updatePostById,
    };
};
