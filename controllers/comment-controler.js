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

    return {
        showComment,
    };
};
