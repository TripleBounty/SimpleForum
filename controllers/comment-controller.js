const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// const { ObjectID } = require('mongodb');

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
        data.posts.getAll()
            .then(() => {
                res.status(200).send();
            });
    }

    
    function newComment(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/api/users/login');
        }
        const postLink = req.body.message[1];
        //console.log(req.user);
        data.comments.create(req.body, req.user, value)
            .then(() => {
                 res.redirect('/forum-post/' + postLink);})
             .catch((error) => {
                 res.render('comment', { inavalid: error });
             });
    }

    return {
        showComment,
        newComment,
    };
};
