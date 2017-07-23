const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());


module.exports = (data) => {
    function showComment(req, res) {
        data.posts.getAll()
            .then(() => {
                res.status(200).send();
            });
    }
    function newComment(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/api/users/login');
        }

        data.comments.create(req.body, req.user)
            .then(() => {
                res.redirect('/');
            })
            .catch((error) => {
                res.render('comment', { inavalid: error });
            });
    }

    return {
        showComment,
        newComment,
    };
};
