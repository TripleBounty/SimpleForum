const BaseData = require('./base/base-data');
const Post = require('../models/post');

class Posts extends BaseData {
    constructor(db) {
        super(db, Post);
    }
    updateLikes(postId, like) {
       return this.findById(postId)
            .then((post) => {
                this.collection.update({
                    id: post.id,
                }, {
                    $set: {
                        nodes: post.nodes + like,
                    },
                });
            });
    }
}

module.exports = Posts;
