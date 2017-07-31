const BaseData = require('./base/base-data');
const Post = require('../models/post');
const { ObjectID } = require('mongodb');

class Posts extends BaseData {
    constructor(db) {
        super(db, Post);
    }

    findPostByTitle(title) {
        return this.collection.findOne({
            'title': title,
        });
    }

    create(model, user) {
        if (!this._isModelValid(model, 'create')) {
            return Promise.reject('Invalid input data');
        }
        
        const dbModel = this.ModelClass.getDataBaseModel(model);

        dbModel.nodes = 0;
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = user.avatar;
        dbModel.isDeleted= false;

        return this.findPostByTitle(model.title)
            .then((post) => {
                if (post) {
                    return Promise.reject('Forum post already exist');
                }
                return this.collection.insert(dbModel);
            });
    }

    // addCommentId(parentId, id) {
    //     this.collection.findById(parentId)
    //         .then((post) => {
    //             if (post) {
    //                 this.collection.update({
    //                     _id: new ObjectID(parentId),
    //                 }, {
    //                         $push: { comments: new ObjectID(id) },
    //                     });
    //             }
    //         });
    //     return this;
    // }

    _isModelValid(model) {
        return Post.validate(model);
    }

    _getDate() {
        const date = new Date();
        return date.toDateString();
    }

    updateLikes(id, like) {
        return this.findById(id)
            .then((post) => {
                return this.collection.update({
                    _id: new ObjectID(id),
                }, {
                        $set: {
                            nodes: post.nodes + like,
                        },
                    });
            });
    }
}

module.exports = Posts;
