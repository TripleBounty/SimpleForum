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

    findByUserName(username) {
        return this.usersCollection.findOne({
            'user_name': username,
        });
    }

    create(model, user, id) {
        const dbModel = this.ModelClass.getDataBaseModel(model);
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = user.avatar;
        dbModel._id = new ObjectID();
        dbModel.isDeleted = false;
        const parentId = dbModel.parandId;

        if (dbModel.postId === dbModel.parandId) {
            return this.collection.update({
                _id: new ObjectID(dbModel.parandId),
            }, {
                    $push: { comments: dbModel },
                })
                .then(() => {
                    this.usersCollection.update({
                        user_name: dbModel.username,
                    }, {
                            $push: { comments: dbModel },
                        });
                });
        }

        return this.collection.findOne({
            _id: new ObjectID(dbModel.postId),
        })
            .then((post) => {
                const postComments = post.comments;

                function dfs(array) {
                    array.forEach((element) => {
                        if (element._id.toString() === parentId.toString()) {
                            element.comments.push(dbModel);
                        }
                        dfs(element.comments);
                    });
                }
                dfs(postComments);
                return this.usersCollection.update({
                    user_name: dbModel.username,
                }, {
                        $push: { comments: dbModel },
                    })
                    .then(() => {
                        this.collection.update({
                            _id: new ObjectID(dbModel.postId),
                        }, {
                                $set: { comments: postComments },
                            });
                    });
            });
    }

    update(model, user) {
        const dbModel = model;
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = user.avatar;
        dbModel._id = model.commentId;

        if (model.postId.toString() === model.commentId.toString()) {
            return this.collection.update({
                _id: new ObjectID(model.postId),
            }, {
                    $set: { content: model.data },
                });
        }

        return this.collection.findOne({
            _id: new ObjectID(model.postId),
        })
            .then((post) => {
                const postComments = post.comments;

                function dfs(array) {
                    array.forEach((element) => {
                        dfs(element.comments);
                        if (element._id.toString() === dbModel._id.toString()) {
                            element.message = model.data;
                        }
                    });
                }
                dfs(postComments);

                return this.collection.update({
                    _id: new ObjectID(dbModel.postId),
                }, {
                        $set: { comments: postComments },
                    })
                    .then(() => {
                        return this.findByUserName(user.user_name)
                            .then((u) => {
                                if (!u) {
                                    return Promise.reject('User do not exist');
                                }
                                const userComments = u.comments;

                                userComments.forEach((element) => {
                                    // eslint-disable-next-line max-len
                                    if (element._id.toString() === dbModel._id.toString()) {
                                        element.message = model.data;
                                    }
                                });
                                return this.usersCollection.update({
                                    user_name: user.user_name,
                                }, {
                                        $set: { comments: userComments },
                                    });
                            });
                    })
                    .catch(() => {
                        return Promise.reject('Invalid input data');
                    });
            });
    }

    delete(model, user) {
        const dbModel = model;
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = user.avatar;
        dbModel._id = model.commentId;

        if (model.postId.toString() === model.commentId.toString()) {
            return this.collection.update({
                _id: new ObjectID(model.postId),
            }, {
                    $set: { isDeleted: true },
                });
        }

        return this.collection.findOne({
            _id: new ObjectID(model.postId),
        })
            .then((post) => {
                const postComments = post.comments;

                const elementsId = [];

                function dfs(array) {
                    array.forEach((element) => {
                        dfs(element.comments);
                        if (element._id.toString() === dbModel._id.toString()) {
                            element.isDeleted = true;
                            elementsId.push(element._id.toString());
                            pushElementId(element.comments);
                        }
                    });
                }
                dfs(postComments);

                function pushElementId(elementComments) {
                    elementComments.forEach((el) => {
                        elementsId.push(el._id.toString());
                        pushElementId(el.comments);
                    });
                }

                return this.collection.update({
                    _id: new ObjectID(dbModel.postId),
                }, {
                        $set: { comments: postComments },
                    })
                    .then(() => {
                        this.findByUserName(user.user_name)
                            .then((u) => {
                                if (!u) {
                                    return Promise.reject('User do not exist');
                                }
                                const userComments = u.comments;
                                userComments.forEach((element) => {
                                    // eslint-disable-next-line max-len
                                    if (element._id.toString() === dbModel._id.toString()) {
                                        element.isDeleted = true;
                                    }
                                    // eslint-disable-next-line max-len
                                    if (elementsId.indexOf(element._id.toString()) >= 0) {
                                        element.isDeleted = true;
                                    }
                                });
                                return this.usersCollection.update({
                                    user_name: u.user_name,
                                }, {
                                        $set: { comments: userComments },
                                    });
                            });
                    })
                    .catch(() => {
                        return Promise.reject('Invalid input data');
                    });
            });
    }
    _getDate() {
        const date = new Date();
        return date.toDateString();
    }
}

module.exports = Comments;
