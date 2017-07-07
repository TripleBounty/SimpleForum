const BaseData = require('./base/base-data');
const User = require('../models/user');

class Users extends BaseData {
    constructor(db) {
        super(db, User);
    }
}

module.exports = Users;
