const BaseData = require('./base/base-data');
const Country = require('../models/country');

class Countries extends BaseData {
    constructor(db) {
        super(db, Country);
    }

    _getCollectionName() {
        return 'countries';
    }
}

module.exports = Countries;
