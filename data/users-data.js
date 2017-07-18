const BaseData = require('./base/base-data');
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());

app.get('/', function(req, resp) {
    resp.cookie('myFirstCookie', 'looks Good', { maxAge: 5000 });
    resp.end('wow');
});

class Users extends BaseData {
    constructor(db) {
        super(db, User);
    }

    findByUserName(username) {
        return this.collection.findOne({
            'user_name': username,
        });
    }

    findUserByCredentials(username, password) {
        const passwordHash = CryptoJS.SHA256(password).toString();
        return this.findByUserName(username)
            .then((user) => {
                if (!!user && user.user_password !== passwordHash) {
                    return null;
                }
                return user;
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
