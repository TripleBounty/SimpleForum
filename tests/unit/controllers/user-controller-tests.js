const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const { getRequestMock, getResponseMock } = require('../mocks/req_res');
const data = {
    countries: {
        getAll() { },
    },
};
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

    describe('RegisterForm tests', () => {
        const countries = {
            bulgaria: 'bulgaria',
            germany: 'germany',
        };

        let getAllStub;
        beforeEach(() => {
            getAllStub = sinon.stub(data.countries, 'getAll');
            getAllStub.returns(Promise.resolve(countries));
        });

        afterEach(() => {
            getAllStub.restore();
        });

        it('Register form should call data.countries.getAll', () => {
            controller.registerForm(req, res);
            expect(getAllStub).to.have.been.calledOnce;
        });

        it('Register form should render register-form template', () => {
            controller.registerForm(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('register-form');
                });
        });

        it('Register form should render register-form template with countries context', () => {
            controller.registerForm(req, res)
                .then(() => {
                    expect(res.context).to.be.deep.equal({ countries });
                });
        });
    });
});
