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

    update(model, user) {
        const dbModel = model;
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = user.avatar;
        dbModel._id = model.commentId;
        let modelNest;
        // eslint-disable-next-line eqeqeq

        if (model.postId == model.commentId) {
            return this.collection.update({
                _id: new ObjectID(model.postId),
            }, {
                    $set: { content: model.data },
                }) 
                ;
        // eslint-disable-next-line no-else-return
        } else {
         return this.collection.findOne({
                _id: new ObjectID(model.postId),
            })
                .then((post) => {
                    const postComments = post.comments;

                    function dfs(array) {
                    array.forEach(function(element) {
                        dfs(element.comments);
                       // eslint-disable-next-line eqeqeq
                        if (element._id == dbModel._id) {                           
                            element.message = model.data;
                            modelNest = post.comments;                            
                            return modelNest;
                        // eslint-disable-next-line no-else-return
                        } 
                    });
                }
                dfs(postComments);

                    return this.collection.update({
                        _id: new ObjectID(dbModel.postId),
                        }, {
                            $set: { comments: modelNest },
                        }) 
                    && 
                        this.findByUserName(user.user_name)
                            .then((user) => {
                            if (!user) {
                                return Promise.reject('User do not exist');
                            }
                            const userComments = user.comments;
                            let modelNestUser;
                            userComments.forEach(function(element) {
                                if (element._id == dbModel._id) {                           
                                    element.message = model.data;
                                    modelNestUser = post.comments;                            
                                    return modelNestUser;
                                // eslint-disable-next-line no-else-return
                                } 
                            });
                    return this.usersCollection.update({
                            user_name: user.user_name,
                        }, {
                            $set: { comments: modelNestUser },
                        });
                    })
                .catch(() => {
                return Promise.reject('Invalid input data');
            });
        });
        // eslint-disable-next-line no-else-return
        }
    }

    delete(model, user) {
        const dbModel = model;
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;
        dbModel.img = user.avatar;
        dbModel._id = model.commentId;
        let modelNest;
        // eslint-disable-next-line eqeqeq

        if (model.postId == model.commentId) {
            return this.collection.update({
                _id: new ObjectID(model.postId),
            }, {
                    $set: { isDeleted: true },
                }) 
                ;
        // eslint-disable-next-line no-else-return
        } else {
         return this.collection.findOne({
                _id: new ObjectID(model.postId),
            })
                .then((post) => {
                    const postComments = post.comments;

                    function dfs(array) {
                    array.forEach(function(element) {
                        dfs(element.comments);
                       // eslint-disable-next-line eqeqeq
                        if (element._id == dbModel._id) {                          
                            element.isDeleted = true;
                            modelNest = post.comments;                            
                            return modelNest;
                        // eslint-disable-next-line no-else-return
                        } 
                    });
                }
                dfs(postComments);
                    return this.collection.update({
                        _id: new ObjectID(dbModel.postId),
                    }, {
                            $set: { comments: modelNest },
                        })
                && 
                        this.findByUserName(user.user_name)
                            .then((user) => {
                            if (!user) {
                                return Promise.reject('User do not exist');
                            }
                            const userComments = user.comments;
                            let modelNestUser;
                            userComments.forEach(function(element) {
                                if (element._id == dbModel._id) {                           
                                    element.isDeleted = true;
                                    modelNestUser = user.comments;                            
                                    return modelNestUser;
                                // eslint-disable-next-line no-else-return
                                } 
                            });
                    return this.usersCollection.update({
                            user_name: user.user_name,
                        }, {
                            $set: { comments: modelNestUser },
                        });
                    })
                .catch(() => {
                return Promise.reject('Invalid input data');
            })
        // eslint-disable-next-line no-else-return
        });
      }
    }
    _getDate() {
        const date = new Date();
        return date.toDateString();
    }
}

module.exports = Comments;
