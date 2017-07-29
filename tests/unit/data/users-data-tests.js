const { expect } = require('chai');
const CryptoJS = require('crypto-js');

const UserData = require('../../../data/users-data');

describe('Users data tests', () => {
    let users;
    let items;
    let collection;
    let db;

    beforeEach(() => {
        items = [];

        collection = {
            name: '',
            find() {
                return {
                    toArray() {
                        return Promise.resolve(items);
                    },
                };
            },

            findOne(constraint) {
                const username = constraint.user_name;
                const item = items.find((el) => el.user_name === username);
                return Promise.resolve(item);
            },

            insert(model) {
                items.push(model);
            },

            update(p1, p2) {
                return Promise.resolve([p1, p2]);
            },
        };

        db = {
            collection(collectionName) {
                collection.name = collectionName;
                return collection;
            },
        };
        users = new UserData(db);
    });

    describe('Method tests', () => {
        it('findByUserName should return user from collection', (done) => {
            const user1 = {
                user_name: 'user1',
                password: 'pass1',
            };
            const user2 = {
                user_name: 'user2',
                password: 'pass2',
            };

            items.push(user1, user2);
            users.findByUserName(user2.user_name)
                .then((user) => {
                    expect(user).to.be.deep.equal(user2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('findByUserName should return undefined if user does not collection', (done) => {
            const user1 = {
                user_name: 'user1',
                password: 'pass1',
            };
            const user2 = {
                user_name: 'user2',
                password: 'pass2',
            };

            items.push(user1, user2);
            users.findByUserName('someRondomUserName')
                .then((user) => {
                    expect(user).to.be.an('undefined');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('findUserByCredentials should return user from collection', (done) => {
            const user1 = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };
            const user2 = {
                user_name: 'user2',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass2').toString(),
            };

            items.push(user1, user2);

            users.findUserByCredentials(user2.user_name, 'pass2')
                .then((user) => {
                    expect(user).to.be.deep.equal(user2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('findUserByCredentials should return undefined if user does not exist in collection', (done) => {
            const user1 = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };
            const user2 = {
                user_name: 'user2',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass2').toString(),
            };

            items.push(user1, user2);
            users.findUserByCredentials('someRondomUserName', 'pass2')
                .then((user) => {
                    expect(user).to.be.an('undefined');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('findUserByCredentials should return null if user password is not correct', (done) => {
            const user1 = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };
            const user2 = {
                user_name: 'user2',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass2').toString(),
            };

            items.push(user1, user2);
            users.findUserByCredentials(user1.user_name, 'SomeRondomPassword')
                .then((user) => {
                    expect(user).to.be.an('null');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Create should reject with Invalid input data is model is not valid', (done) => {
            users._isModelValid = () => {
                return false;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            users.create(model)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid input data');
                    done();
                })
                .catch(done);
        });

        it('Create should add object to the collection', (done) => {
            users._isModelValid = () => {
                return true;
            };

            users.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            users.create(model)
                .then(() => {
                    expect(items).to.contains(model);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it('Create should reject if user with same user_name exist', (done) => {
            users._isModelValid = () => {
                return true;
            };

            users.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            items.push(model);

            users.create(model)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid input data');
                    done();
                })
                .catch(done);
        });

        // eslint-disable-next-line max-len
        it('Update should reject with Invalid input data is model is not valid', (done) => {
            users._isModelValid = () => {
                return false;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            users.update(model)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid input data');
                    done();
                })
                .catch(done);
        });

        // eslint-disable-next-line max-len
        it('Update should reject if user with same user_name does not exist', (done) => {
            users._isModelValid = () => {
                return true;
            };

            users.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            users.update(model)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid input data');
                    done();
                })
                .catch(done);
        });

        it('Update should call update db with correct params', (done) => {
            users._isModelValid = () => {
                return true;
            };

            users.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const model = {
                _id: 'validMongoId',
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            items.push(model);

            const expected = [{ _id: 'validMongoId' }, { '$set': model }];

            users.update(model)
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        // eslint-disable-next-line max-len
        it('updatePassword should reject with Invalid input data is model is not valid', (done) => {
            users._isPasswordValid = () => {
                return false;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            users.updatePassword(model)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid input data');
                    done();
                })
                .catch(done);
        });

        // eslint-disable-next-line max-len
        it('updatePassword should reject if user with same user_name does not exist', (done) => {
            users._isPasswordValid = () => {
                return true;
            };

            users.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            users.updatePassword(model)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('User do not exist');
                    done();
                })
                .catch(done);
        });

        // eslint-disable-next-line max-len
        it('updatePassword should reject if old password is incorrect', (done) => {
            users._isPasswordValid = () => {
                return true;
            };

            users.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
                // eslint-disable-next-line new-cap
                old_password: CryptoJS.SHA256('pass2').toString(),
            };

            const oldModel = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            items.push(oldModel);

            users.updatePassword(model)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Incorrect old password');
                    done();
                })
                .catch(done);
        });

        // eslint-disable-next-line max-len
        it('updatePassword should call update db with correct params', (done) => {
            users._isModelValid = () => {
                return true;
            };

            users.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const model = {
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: 'pass2',
                // eslint-disable-next-line new-cap
                old_password: 'pass1',
            };

            const oldModel = {
                _id: 'validMongoId',
                user_name: 'user1',
                // eslint-disable-next-line new-cap
                user_password: CryptoJS.SHA256('pass1').toString(),
            };

            items.push(oldModel);

            const expected = [{ _id: 'validMongoId' }, { '$set': model }];

            users.updatePassword(model)
                .then((data) => {
                    expect(data).to.be.deep.equal(expected);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});


