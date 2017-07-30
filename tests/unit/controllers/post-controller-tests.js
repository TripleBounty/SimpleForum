const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { getRequestMock, getResponseMock } = require('../Mocks/req_res');
const data = {
    users: {
        create() { },
        update() { },
        updatePassword() { },
        findByUserName() { },
    },
};
const controller = require('../../../controllers/post-controller')(data);
    
describe('Post Controller Tests', () => {
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
});
