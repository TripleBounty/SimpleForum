const BaseData = require('./base/base-data');
const User = require('../models/user');

class Users extends BaseData {
    constructor(db) {
        super(db, User);
    }

    findByUserName(username) {
        return this.collection.findOne({
            'user_name': username,
        });
    }

    _isModelValid(model) {
        return User.validate(model);
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
}

module.exports = Users;
