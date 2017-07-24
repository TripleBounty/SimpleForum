const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// const { ObjectID } = require('mongodb');


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
        console.log(req.body);
        console.log(req.user);
        // TODO
    }

    return {
        showComment,
        newComment,
    };
};
