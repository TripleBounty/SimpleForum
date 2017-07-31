const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { getRequestMock, getResponseMock } = require('../Mocks/req_res');
const data = {
    posts: {
        create() { },
        findById() {
            return Promise.resolve();
        },
        getAllSortedByDate() {
            return Promise.resolve();
        },
        updateLikes() {

        },
    },
    users: {
        create() { },
        update() { },
        updatePassword() { },
        findByUserName() { },
    },
};
const controller = require('../../../controllers/post-controller')(data);

describe('Post controller tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = getRequestMock();
        res = getResponseMock();
    });


    describe('New Post Form Tets', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /api/users/login if user is not autenticated server ', () => {
            controller.newPostForm(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        it('should render post-form if user is autenticated', () => {
            req.login({ user_name: 'myUserName' });
            controller.newPostForm(req, res);
            expect(res.viewName).to.be.equal('new-forum-post');
        });

        // eslint-disable-next-line max-len
        it('should render new-forum-post with user and is autenticated true', () => {
            req.login({ user_name: 'myUserName' });
            const expected = {
                'user': req.user,
                'isAutenticated': true,
            };

            controller.newPostForm(req, res);
            expect(res.context).to.be.deep.equal(expected);
        });
    });
    describe('Post Tests', () => {
        it('Should call base data findById with id', (done) => {
            const postId = 'MyId';
            req.params = {};
            req.params.postId = postId;

            const post = {
                postId: postId,
            };


            const stubFind = sinon.stub(data.posts, 'findById')
                .returns(Promise.resolve(post));

            controller.getPostById(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(stubFind).to.have.been.calledOnce;
                    expect(stubFind).to.have.been.calledWith(postId);
                    stubFind.restore();
                    done();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });

        it('Should render post template with post found', (done) => {
            const postId = 'MyId';
            req.params = {};
            req.params.postId = postId;

            const post = {
                postId: postId,
            };

            const stubFind = sinon.stub(data.posts, 'findById')
                .returns(Promise.resolve(post));

            controller.getPostById(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('forum-post');
                    expect(res.context.post).to.be.deep.equal(post);
                    stubFind.restore();
                    done();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should render post template with empty user if user not found', (done) => {
            const postId = 'MyId';
            req.params = {};
            req.params.postId = postId;

            const post = {
                postId: postId,
            };

            const stubFind = sinon.stub(data.posts, 'findById')
                .returns(Promise.resolve(post));

            controller.getPostById(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('forum-post');
                    expect(res.context.post).to.be.deep.equal(post);
                    stubFind.restore();
                    done();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should render post template with isAutenticated true and the user profile is found', (done) => {
            req.login({ user_name: 'myUserName' });

            const postId = 'MyId';
            req.params = {};
            req.params.postId = postId;

            const post = {
                postId: postId,
            };

            const stubFind = sinon.stub(data.posts, 'findById')
                .returns(Promise.resolve(post));

            controller.getPostById(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('forum-post');
                    expect(res.context.isAutenticated).to.be.equal(true);
                    stubFind.restore();
                    done();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });
    });

    describe('Post Home Tests', () => {
        it('Should call base data getAllSortedByDate', (done) => {
            req.login({ user_name: 'myUserName' });

            const date = 'Sun Jul 30 2017';
            req.params = {};
            req.params.date = date;

            const posts = [{
                _id: 597e0314,
                title: 'Des-pa',
                content: 'Cito',
                date: date,
                nodes: 0,
                username: 'stoqn',
                img: 'https://simple-forum.s3.eu-central-1.amazonaws.com/img_2017_6_30_1501430485018.png',
                isDeleted: false,
                comments: [],
            },
            ];

            const stubGetAll = sinon.stub(data.posts, 'getAllSortedByDate')
                .returns(Promise.resolve(posts));


            controller.getAll(req, res)
                .then(() => {
                    // eslint-disable-next-line
                    expect(stubGetAll).to.have.been.calledOnce;
                    expect(stubGetAll).to.have.been.calledWith();
                    stubGetAll.restore();
                    done();
                })
                .catch((error) => {
                    stubGetAll.restore();
                    done(error);
                });
        });
        it('Should render home template with post found ', (done) => {
            req.login({ user_name: 'myUserName' });

            const date = 'Sun Jul 30 2017';
            req.params = {};
            req.params.date = date;

            const posts = [{
                _id: 597e0314,
                title: 'Des-pa',
                content: 'Cito',
                date: date,
                nodes: 0,
                username: 'stoqn',
                img: 'https://simple-forum.s3.eu-central-1.amazonaws.com/img_2017_6_30_1501430485018.png',
                isDeleted: false,
                comments: [],
            },
            ];

            const stubGetAll = sinon.stub(data.posts, 'getAllSortedByDate')
                .returns(Promise.resolve(posts));

            controller.getAll(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('home');
                    expect(res.context.posts).to.be.deep.equal(posts);
                    stubGetAll.restore();
                    done();
                })
                .catch((error) => {
                    stubGetAll.restore();
                    done(error);
                });
        });
    });
    describe('Post Create', () => {
        it('should call data posts create', () => {
            req.login({ user_name: 'myUserName' });
            const create = sinon.stub(data.posts, 'create')
                .returns(Promise.resolve());
            controller.newPost(req, res);
            // eslint-disable-next-line no-unused-expressions
            expect(create).to.be.calledOnce;
            create.restore();
        });
        it('should render post-form with error', (done) => {
            req.login({ user_name: 'myUserName' });
            const err = 'MyError';
            const create = sinon.stub(data.posts, 'create')
                .returns(Promise.reject(err));

            controller.newPost(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('new-forum-post');
                    expect(res.context.inavalid).to.be.equal(err);
                    done();
                })
                .catch((error) => {
                    create.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line
        it('should render post-form to redirect to /api/users/login if user is not logged in', (done) => {
            controller.newPost(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
            expect(req.isAuthenticated()).to.be.equal(false);
            done();
        });
    });
    describe('Post Likes Update should post', () => {
        it('should render post-form with error', (done) => {
            const create = sinon.stub(data.posts, 'updateLikes')
                .returns(Promise.resolve());

            controller.updatePostById(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                })
                .catch((error) => {
                    create.restore();
                    done(error);
                });
        });
    });
});
