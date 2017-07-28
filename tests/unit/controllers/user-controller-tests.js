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
    users: {
        create() { },
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
            req._isAuthenticated = true;
            controller.logout(req, res);
            expect(req.isAuthenticated()).to.be.equal(false);
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
            // eslint-disable-next-line no-unused-expressions
            expect(getAllStub).to.have.been.calledOnce;
        });

        it('Register form should render register-form template', (done) => {
            controller.registerForm(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('register-form');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Register form should render register-form template with countries context', (done) => {
            controller.registerForm(req, res)
                .then(() => {
                    expect(res.context).to.be.deep.equal({ countries });
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('Register tests', () => {
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

        it('should call data users create', () => {
            const create = sinon.stub(data.users, 'create')
                .returns(Promise.resolve());
            controller.register(req, res);
            expect(create).to.be.calledOnce;
            create.restore();
        });

        it('should render register-form with error', (done) => {
            const err = 'MyError';
            const create = sinon.stub(data.users, 'create')
                .returns(Promise.reject(err));
            controller.register(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('register-form');
                    expect(res.context.inavalid).to.be.equal(err);
                    done();
                })
                .catch((error) => {
                    create.restore();
                    done(error);
                });
        });
    });

    describe('Update form tests', () => {
        const countries = {
            bulgaria: 'bulgaria',
            germany: 'germany',
        };

        const user = 'validUser';

        let getAllStub;
        beforeEach(() => {
            getAllStub = sinon.stub(data.countries, 'getAll');
            getAllStub.returns(Promise.resolve(countries));
        });

        afterEach(() => {
            getAllStub.restore();
        });

        // eslint-disable-next-line max-len
        it('if user is not autenticated server should redirect to /api/users/login', () => {
            controller.updateForm(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        // eslint-disable-next-line max-len
        it('should render update-form template if user is autenticated', (done) => {
            req._isAuthenticated = true;
            req.user = user;
            controller.updateForm(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('update-form');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('should render update-form template if user is autenticated with correct countries context', (done) => {
            req._isAuthenticated = true;
            req.user = user;
            controller.updateForm(req, res)
                .then(() => {
                    expect(res.context.countries).to.be.deep.equal(countries);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('should render update-form template if user is autenticated with correct user context', (done) => {
            req._isAuthenticated = true;
            req.user = user;
            controller.updateForm(req, res)
                .then(() => {
                    expect(res.context.user).to.be.equal(user);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('should render update-form template if user is autenticated with correct isAuteticated context', (done) => {
            req._isAuthenticated = true;
            req.user = user;
            controller.updateForm(req, res)
                .then(() => {
                    expect(res.context.isAutenticated).to.be.equal(true);
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
