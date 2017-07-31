const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { getRequestMock, getResponseMock } = require('../Mocks/req_res');
const data = {
    posts:{
         getAll() {
             return Promise.resolve()
         },
    },
    comments:{
        update() {return Promise.resolve()},
        delete() {},
        create() {return Promise.resolve()},
    },
    users: {
        create() { },
        update() { },
        updatePassword() { },
        findByUserName() { },
    },
};
const controller = require('../../../controllers/comment-controller')(data);
    
describe('Comment controller tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = getRequestMock();
        res = getResponseMock();
    });

    describe('Show Comment Tets', () => {
        // eslint-disable-next-line max-len
        it('should responde with code 200', (done) => {
            const show = sinon.stub(data.posts, 'getAll')
                .returns(Promise.resolve());

            controller.showComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                })
                .catch((error) => {
                    show.restore();
                    done(error);
                });
        });
    });
    describe('Update Comment Test', () => {
        // eslint-disable-next-line max-len
        it('should update responde with code 200', (done) => {
            const updateMock = sinon.stub(data.comments, 'update')
                .returns(Promise.resolve());

            controller.updateComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    updateMock.restore();
                    done();
                })
                .catch((error) => {
                    updateMock.restore();
                    done(error);
                });
        });
        it('should render comment with error', (done) => {
           const stubUpdate = sinon.stub(data.comments, 'update')
                .returns(Promise.reject());

            controller.updateComment(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('comment');
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });
    });
    describe('Delete Comment Test', () => {
        // eslint-disable-next-line max-len
        it('should delete responde with code 200', (done) => {
            const stubDelete = sinon.stub(data.comments, 'delete')
                .returns(Promise.resolve());

            controller.deleteComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    stubDelete.restore();
                    done();
                })
                .catch((error) => {
                    stubDelete.restore();
                    done(error);
                });
        });
        it('should render comment with error', (done) => {
           const stubDelete= sinon.stub(data.comments, 'delete')
                .returns(Promise.reject());

            controller.deleteComment(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('comment');
                    stubDelete.restore();
                    done();
                })
                .catch((error) => {
                    stubDelete.restore();
                    done(error);
                });
        });
    });
    describe('New Comment Test', () => {
        // eslint-disable-next-line max-len
        it('should new comment to redirect to /api/users/login if user is not logged in', (done) => {            
            controller.newComment(req, res);
            expect(res.status().status().redirectUrl).to.be.equal('/api/users/login');
            expect(req.isAuthenticated()).to.be.equal(false);
            done();            
        });
        it('should render create comment at forum-post', (done) => {
            req.login({ user_name: 'myUserName' });
            req.body.message[1] = 'awsomePost';
            const stubCreate = sinon.stub(data.comments, 'create')
                .returns(Promise.resolve());

            controller.newComment(req, res)
                .then(() => {
                    console.log(res);
                    expect(res.redirectUrl).to.be.equal('/forum-post/awsomePost');
                    stubCreate.restore();
                    done();
                })
                .catch((error) => {
                    stubCreate.restore();
                    done(error);
                });
        });
        it('should render create comment with error', (done) => {
            req.login({ user_name: 'myUserName' });
            req.body.message[1] = 'awsomePost';
            const stubCreate = sinon.stub(data.comments, 'create')
                .returns(Promise.reject());

            controller.newComment(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('comment');
                    stubCreate.restore();
                    done();
                })
                .catch((error) => {
                    stubCreate.restore();
                    done(error);
                });
        });
    });
});
