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
        const postId = req.params.postId;
        data.posts.updateLikes(postId, 1)
            .then(() => {
                // res.redirect('/');
            });
    }

    function newPostForm(req, res) {
        res.render('new-forum-post');
    }

    function newPost(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/api/users/login');
        }

        data.posts.create(req.body, req.user)
            .then(() => {
                res.redirect('/');
            })
            .catch((error) => {
                res.render('new-forum-post', { inavalid: error });
            });
    }

    return {
        getPostById,
        getAll,
        updatePostById,
        newPostForm,
        newPost,
    };
};
