const BaseData = require('./base/base-data');
const Post = require('../models/forum-post');

class Posts extends BaseData {
    constructor(db) {
        super(db, Post);
    }

    _isModelValid(model) {
        return Post.validate(model);
    }

    create(model) {
        if (this._isModelValid) {
            const error = this._isModelValid(model);
            if (error !== 'no') {
                return Promise.reject(error);
            }
        }

        const dbModel = this.ModelClass.getDataBaseModel(model);

        return this.findByUserName(model.user_name)
            .then((user) => {
                if (user) {
                    return Promise.reject('User already exist');
                }
                return this.collection.insert(dbModel);
            });
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
