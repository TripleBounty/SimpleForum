const chai = require('chai');
const expect = chai.expect;

const { getRequestMock, getResponseMock } = require('../mocks/req_res');

const controller = require('../../../controllers/chat-room-controller')();

describe('Chat room controller tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = getRequestMock();
        res = getResponseMock();
    });

    describe('showRoom tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /api/users/login if user is not autenticated server', () => {
            controller.showRoom(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        it('should render chat-room template if user is autenticated', () => {
            const user = {
                user_name: 'MyUserName',
            };
            req.login(user);
            controller.showRoom(req, res);
            expect(res.viewName).to.be.equal('chat-room');
        });

        // eslint-disable-next-line max-len
        it('should render chat-room template if user is autenticated with user and is_autenticated true', () => {
            const user = {
                user_name: 'MyUserName',
            };
            req.login(user);

            const expected = {
                'user': req.user,
                'isAutenticated': true,
            };

            controller.showRoom(req, res);
            expect(res.context).to.be.deep.equal(expected);
        });
    });
});
