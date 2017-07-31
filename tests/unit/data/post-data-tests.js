const { expect } = require('chai');

const PostData = require('../../../data/posts-data');

describe('Post data tests', () => {
    let posts;
    let items;
    let collection;
    let db;

    beforeEach(() => {
        items = [];

        collection = {
            findOne(constraint) {
                const title = constraint.title;
                const item = items.find((el) => el.title === title);
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
        posts = new PostData(db);
    });

    describe('Method tests', () => {
        it('findPostByTitle should return post from collection', (done) => {
            const post1 = {
                title: 'post1',
            };
            const post2 = {
                title: 'post2',
            };

            items.push(post1, post2);
            posts.findPostByTitle(post1.title)
                .then((x) => {
                    expect(x).to.be.deep.equal(post1);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('updateLikes should update post nodes count', (done) => {
            const post = {
                _id: 1,
                nodes: 1,
            };

            items.push(post);
            posts.updateLikes(1, 1)
                .then((x) => {
                    expect(x[1].$set.nodes).to.be.deep.equal(2);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('create should add new forum post to the collection', (done) => {
            const validPostTemp = posts._isModelValid;

            posts._isModelValid = () => {
                return true;
            };

            posts._getDate = ()=> {
                return '08/01/2017';
            };

            const oldGetDataBaseModel = posts.ModelClass.getDataBaseModel;
            posts.ModelClass.getDataBaseModel = (m) => {
                return m;
            };

            const user = {
                user_name: 'testUser',
                avatar: 'testAvatar',
            };
            const post = {
                title: 'postTitle',
                content: 'postContent',
            };

            posts.create(post, user)
                .then(() => {
                    expect(items).to.contains(post);
                    posts.ModelClass.getDataBaseModel = oldGetDataBaseModel;
                    posts._isModelValid = validPostTemp;
                    done();
                })
                .catch((err) => {
                    posts.ModelClass.getDataBaseModel = oldGetDataBaseModel;
                    posts._isModelValid = validPostTemp;
                    done(err);
                });
        });

        it('Create should reject with Invalid post model', (done) => {
            const validPostTemp = posts._isModelValid;

            posts._isModelValid = () => {
                return false;
            };

            posts._getDate = ()=> {
                return '08/01/2017';
            };

            const user = {
                user_name: 'testUser',
                avatar: 'testAvatar',
            };
            const post = {
                title: 'postTitle',
                content: 'postContent',
            };

            posts.create(post, user)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((err) => {
                    expect(err).to.be.deep.equal('Invalid input data');
                    posts._isModelValid = validPostTemp;
                    done();
                })
                .catch((err) => {
                    posts._isModelValid = validPostTemp;
                });
        });
    });
});
