const { expect } = require('chai');

const items = [];

const collection = {
    name: '',
    find() {
        return {
            toArray() {
                return Promise.resolve(items);
            },
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

const db = {
    collection(collectionName) {
        collection.name = collectionName;
        return collection;
    },
};

describe('Data tests', () => {
    it('Expect data to have users property', (done) => {
        require('../../../data')(db)
            .then((data) => {
                expect(data).to.have.own.property('users');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('Expect data to have posts property', (done) => {
        require('../../../data')(db)
            .then((data) => {
                expect(data).to.have.own.property('posts');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('Expect data to have countries property', (done) => {
        require('../../../data')(db)
            .then((data) => {
                expect(data).to.have.own.property('countries');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('Expect data to have comments property', (done) => {
        require('../../../data')(db)
            .then((data) => {
                expect(data).to.have.own.property('comments');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
