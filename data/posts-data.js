const BaseData = require('./base/base-data');
const Post = require('../models/post');

class Posts extends BaseData {
    constructor(db) {
        super(db, Post);
    }

    _isModelValid(model) {
        return Post.isValid(model);
    }

    findPostByTitle(title) {
        return this.collection.findOne({
            'title': title,
        });
    }

    create(model, user) {
        if (!this._isModelValid(model)) {
            return Promise.reject('invalid post data');
        }

        const dbModel = this.ModelClass.getDataBaseModel(model);
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = '';

        return this.findPostByTitle(model.title)
            .then((post) => {
                if (post) {
                    return Promise.reject('Forum post already exist');
                }
                return this.collection.insert(dbModel);
            });
    }

    _getDate() {
        const date = new Date();
        return date.toDateString();
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
