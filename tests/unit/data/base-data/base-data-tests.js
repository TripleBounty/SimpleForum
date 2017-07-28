const { expect } = require('chai');

const BaseData = require('../../../../data/base/base-data');

describe('Base-data tests', () => {
    let baseData;
    let db;
    let ModelClass;
    let collection;
    let items;

    beforeEach(() => {
        items = [];

        collection = {
            name: '',
            find() {
                return {
                    sort(constraint) {
                        return {
                            toArray() {
                                return Promise.resolve({
                                    sorted: true,
                                    items: items,
                                });
                            },
                        };
                    },
                };
            },

            findOne(constraint) {
                console.log(constraint);
                return Promise.resolve();
            },
            insert(model) {
                this.arr.push(model);
            },
        };

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
            },
        };

        ModelClass = {
            name: 'mockedCollection',
        };
        baseData = new BaseData(db, ModelClass);
    });

    describe('Constructor tests', () => {
        it('Should init db property', () => {
            expect(baseData.db).to.be.equal(db);
        });

        it('Should init ModelClass property', () => {
            expect(baseData.ModelClass).to.be.equal(ModelClass);
        });

        it('Should init collection name property', () => {
            // eslint-disable-next-line max-len
            expect(baseData.collectionName).to.be.equal(ModelClass.name.toLowerCase() + 's');
        });

        it('Should init collection property', () => {
            // eslint-disable-next-line max-len
            expect(baseData.collection).to.be.equal(collection);
            // eslint-disable-next-line max-len
            expect(baseData.collection.name).to.be.equal(ModelClass.name.toLowerCase() + 's');
        });
    });

    describe('Method tests', () => {
        it('getAll should return collection data', (done) => {
            const expected = [1, 2, 3, 4];
            items.push(...expected);
            baseData.getAll()
                .then((data) => {
                    expect(data.sorted).to.be.equal(true);
                    expect(data.items).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('findOne should return collection item', (done) => {
            const expected = [1, 2, 3, 4];
            items.push(...expected);

            const id = 3;

            baseData.findById(id)
                .then((data) => {
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});

