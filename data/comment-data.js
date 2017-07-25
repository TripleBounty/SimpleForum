const BaseData = require('./base/base-data');
const Comment = require('../models/comment');
const { ObjectID } = require('mongodb');

class Comments extends BaseData {
    constructor(db) {
        super(db, Comment);
        this.collection = this.db.collection("posts");
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
        const postId = dbModel.postId;
        let modelNest;
  
        //console.log('stigam do data');
        if (dbModel.postId == dbModel.parandId) {
            return this.collection.update({
                _id: new ObjectID(dbModel.parandId),
            }, {
                    $push: { comments: dbModel },
                });
        } else {
            let postObject;
            return this.collection.findOne({
                _id: new ObjectID(dbModel.postId),
            })
                .then((post) => {
                    //console.log(post);
                    const postComments = post.comments;

                    function dfs(array) { 
                    array.forEach(function (element) {
                        dfs(element.comments);
                        if (element._id == parentId) {
                            //console.log(element.message);
                            element.comments.push(dbModel);
                            return modelNest = post.comments;
                        } else {
                            return;
                        }            
                    });
                };
                
                //console.log("predi dfs");
                dfs(postComments);
                    return this.collection.update({
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
