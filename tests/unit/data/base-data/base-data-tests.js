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
                const id = constraint._id.toString();
                const item = items.find((el) => el === id);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
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
            _isModelValid() {
                return true;
            },
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
            items = [
                '5906f669b04a7f1dd47d7a31',
                '5906f669b04a7f1dd47d7a32',
                '5906f669b04a7f1dd47d7a33',
                '5906f669b04a7f1dd47d7a34',
                '5906f669b04a7f1dd47d7a35',
            ];

            const expected = '5906f669b04a7f1dd47d7a34';

            baseData.findById(expected)
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('findOne should return undefined if item does not exist', (done) => {
            items = [
                '5906f669b04a7f1dd47d7a31',
                '5906f669b04a7f1dd47d7a32',
                '5906f669b04a7f1dd47d7a33',
                '5906f669b04a7f1dd47d7a34',
                '5906f669b04a7f1dd47d7a35',
            ];

            const expected = '5906f669b04a7f1dd47d7a41';

            baseData.findById(expected)
                .then((data) => {
                    expect(data).to.be.an('undefined');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('create should add element to the collection', () => {
            const expected = '5906f669b04a7f1dd47d7a41';

            baseData.create(expected);

            expect(items).to.be.deep.equal([expected]);
        });

        it('create should add element to the collection', () => {
            const expected = '5906f669b04a7f1dd47d7a41';

            baseData.create(expected);

            expect(items).to.be.deep.equal([expected]);
        });

        // eslint-disable-next-line max-len
        it('create should reject with invalid data if the model is not valide', (done) => {
            const expected = '5906f669b04a7f1dd47d7a41';
            baseData._isModelValid = () => {
                return false;
            };

            baseData.create(expected)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('invalid data');
                    done();
                })
                .catch(done);
        });
    });
});
