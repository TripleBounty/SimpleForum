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
        data.posts.getAll()
            .then((posts) => {
                res.render('home', {
                    'posts': posts,
                });
            });
    }

    function updatePostById(req, res) {
        const postId = req.params.postId;
        data.posts.updateLikes(postId, 1)
            .then(() => {
                //res.redirect('/');
            });
    }

    return {
        getPostById,
        getAll,
        updatePostById,
    };
};
