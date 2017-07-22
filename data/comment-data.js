const BaseData = require('./base/base-data');
const Comment = require('../models/comment');

class Comments extends BaseData {
    constructor(db) {
        super(db, Comment);
    }

        _isModelValid(model) {
        return Comment.isValid(model);
    }

    create(model, user) {
        const dbModel = this.ModelClass.getDataBaseModel(model);
        dbModel.date = this._getDate();
        dbModel.username = user.user_name;

        return this.collection.insert(dbModel);
    }

    _getDate() {
        const date = new Date();
        return date.toDateString();
    }
}

module.exports = Comments;
