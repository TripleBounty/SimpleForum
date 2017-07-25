const { ObjectID } = require('mongodb');

class BaseData {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find().sort({date: -1}).toArray();
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('invalid data');
        }

        return this.collection.insert(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }

    _isModelValid(model) {
        return true;
    }
}

module.exports = BaseData;
