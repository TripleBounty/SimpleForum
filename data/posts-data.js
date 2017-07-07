const BaseData = require('./base/base-data');
const Post = require('../models/post');

class Posts extends BaseData {
    constructor(db) {
        super(db, Post);
    }
}

module.exports = Posts;
