const BaseData = require('./base/base-data');
const Comment = require('../models/comment');
const { ObjectID } = require('mongodb');

class Comments extends BaseData {
    constructor(db) {
        super(db, Comment);
        this.collection = this.db.collection('posts');
        this.usersCollection = this.db.collection('users');
    }

    _isModelValid(model) {
        return Comment.isValid(model);
    }

    create(model, user, id) {
        const dbModel = this.ModelClass.getDataBaseModel(model);
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = user.avatar;
        dbModel._id = new ObjectID();
        const parentId = dbModel.parandId;
        let modelNest;
        // eslint-disable-next-line eqeqeq
        if (dbModel.postId == dbModel.parandId) {
            return this.collection.update({
                _id: new ObjectID(dbModel.parandId),
            }, {
                    $push: { comments: dbModel },
                }) &&
                this.usersCollection.update({
                        user_name: dbModel.username,
                    }, {
                            $push: { comments: dbModel },
                        })
                ;
        // eslint-disable-next-line no-else-return
        } else {
            return this.collection.findOne({
                _id: new ObjectID(dbModel.postId),
            })
                .then((post) => {
                    const postComments = post.comments;

                    function dfs(array) {
                    array.forEach(function(element) {
                        dfs(element.comments);
                       // eslint-disable-next-line eqeqeq
                        if (element._id == parentId) {
                            element.comments.push(dbModel);
                            modelNest = post.comments;
                            return modelNest;
                        // eslint-disable-next-line no-else-return
                        } else {
                        // eslint-disable-next-line consistent-return
                            return;
                        }
                    });
                }
                dfs(postComments);
                    return this.usersCollection.update({
                        user_name: dbModel.username,
                    }, {
                            $push: { comments: dbModel },
                        }) &&
                        this.collection.update({
                        _id: new ObjectID(dbModel.postId),
                    }, {
                            $set: { comments: modelNest },
                        });
                });
        }
    }

    _getDate() {
        const date = new Date();
        return date.toDateString();
    }
}

module.exports = Comments;
