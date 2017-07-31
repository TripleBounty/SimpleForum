const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

const value = guid();

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

module.exports = (data) => {
    function showComment(req, res) {
        return data.posts.getAll()
            .then(() => {
                res.status(200).send();
            });
    }

    function updateComment(req, res) {
        return data.comments.update(req.body, req.user)
            .then(() => {
                res.status(200).send();
            })
            .catch((error) => {
                res.render('comment', { inavalid: error });
            });
    }

    function deleteComment(req, res) {
        return data.comments.delete(req.body, req.user)
            .then(() => {
                res.status(200).send();
            })
            .catch((error) => {
                res.render('comment', { inavalid: error });
            });
    }

    function newComment(req, res) {
        if (!req.isAuthenticated()) {
            return Promise.resolve(
                res.status(401).redirect('/api/users/login')
            );
        }
        const postLink = req.body.message[1];
        return data.comments.create(req.body, req.user, value)
            .then(() => {
                res.redirect('/forum-post/' + postLink);
            })
            .catch((error) => {
                res.render('comment', { inavalid: error });
            });
    }

    return {
        showComment,
        newComment,
        updateComment,
        deleteComment,
    };
};
