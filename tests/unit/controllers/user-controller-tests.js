const { expect } = require('chai');
const { getRequestMock, getResponseMock } = require('../mocks/req_res');
const data = {};
const controller = require('../../../controllers/user-controller')(data);

describe('User controller tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = getRequestMock();
        res = getResponseMock();
    });

    describe('login tests', () => {
        it('Login should render login-form.pug template', () => {
            controller.login(req, res);
            expect(res.viewName).to.be.equal('login-form');
        });

        // eslint-disable-next-line max-len
        it('Login should render login-form.pug template with isAutenticated context property equal to false', () => {
            controller.login(req, res);
            const context = {
                'isAutenticated': false,
            };
            expect(res.context).to.be.deep.equal(context);
        });
    });

    describe('logout tests', () => {
        it('Logout should call logout of the request', () => {
            req.isAuthenticated = true;
            controller.logout(req, res);
            expect(req.isAuthenticated).to.be.equal(false);
        });

        it('Logout should redirect to home page', () => {
            controller.logout(req, res);
            expect(res.redirectUrl).to.be.equal('/');
        });
    });
});
