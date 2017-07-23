class BaseData {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find().toArray();
    }

    findById(id) {
        return this.collection.findOne({
            id: id,
        });
    }

    create(model) {
        if (this._isModelValid) {
            const error = this._isModelValid(model);
            if (error !== 'no') {
                return Promise.reject(error);
            }
        }

        return this.collection.insert(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }

}

module.exports = BaseData;
