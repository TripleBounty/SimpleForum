module.exports = (data) => {
    function getPostById(req, res) {
        const id = req.params.postId;

        data.posts.findById(id)
            .then((post) => {
                res.render('post', post);
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

    return {
        getPostById,
        getAll,
    };
};
