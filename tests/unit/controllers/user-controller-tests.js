const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { getRequestMock, getResponseMock } = require('../mocks/req_res');
const data = {
    countries: {
        getAll() { },
    },
    users: {
        create() { },
        update() { },
        updatePassword() { },
        findByUserName() { },
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
            req.login({ user_name: 'myUserName' });
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
            // eslint-disable-next-line no-unused-expressions
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
        it('should redirect to /api/users/login if user is not autenticated server', () => {
            controller.updateForm(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        // eslint-disable-next-line max-len
        it('should render update-form template if user is autenticated', (done) => {
            req.login({ user_name: 'myUserName' });
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
            req.login(user);
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
            req.login(user);
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
            req.login({ user_name: 'myUserName' });
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
    describe('Update tests', () => {
        // eslint-disable-next-line max-len
        it('if user is not autenticated server should redirect to /api/users/login', () => {
            controller.update(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        it('Should call data users update', (done) => {
            req.login({ user_name: 'myUserName' });
            const stubUpdate = sinon.stub(data.users, 'update')
                .returns(Promise.resolve());
            controller.update(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(stubUpdate).to.be.calledOnce;
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });

        it('Should call data users update with request body', (done) => {
            req.login({ user_name: 'myUserName' });

            const expectedParam = {
                user_name: 'MyUserName',
                first_name: 'NewFirstName',
            };

            req.body = expectedParam;

            const stubUpdate = sinon.stub(data.users, 'update')
                .returns(Promise.resolve());
            controller.update(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(stubUpdate).to.have.been.calledWith(expectedParam);
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });

        it('Should redirect to /api/users/profile after update', (done) => {
            req.login({ user_name: 'myUserName' });
            const stubUpdate = sinon.stub(data.users, 'update')
                .returns(Promise.resolve());
            controller.update(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/api/users/profile');
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });

        it('Should render update-form with error', (done) => {
            req.login({ user_name: 'myUserName' });
            const err = 'MyError';
            const stubUpdate = sinon.stub(data.users, 'update')
                .returns(Promise.reject(err));

            const countries = {
                bulgaria: 'bulgaria',
                germany: 'germany',
            };
            const getAllStub = sinon.stub(data.countries, 'getAll');
            getAllStub.returns(Promise.resolve(countries));

            controller.update(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('update-form');
                    expect(res.context.inavalid).to.be.equal(err);
                    stubUpdate.restore();
                    getAllStub.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    getAllStub.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should render update-form with countries, user and authenticated true', (done) => {
            req.login({ user_name: 'myUserName' });
            const err = 'MyError';
            const stubUpdate = sinon.stub(data.users, 'update')
                .returns(Promise.reject(err));

            const countries = {
                bulgaria: 'bulgaria',
                germany: 'germany',
            };
            const getAllStub = sinon.stub(data.countries, 'getAll');
            getAllStub.returns(Promise.resolve(countries));

            const expected = {
                'inavalid': err,
                'countries': countries,
                'user': req.user,
                'isAutenticated': true,
            };
            controller.update(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('update-form');
                    expect(res.context).to.be.deep.equal(expected);
                    stubUpdate.restore();
                    getAllStub.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    getAllStub.restore();
                    done(error);
                });
        });
    });

    describe('Update Password Form tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /api/users/login if user is not autenticated server ', () => {
            controller.updatePasswordForm(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        it('should render update-password-form if user is autenticated', () => {
            req.login({ user_name: 'myUserName' });
            controller.updatePasswordForm(req, res);
            expect(res.viewName).to.be.equal('update-password-form');
        });

        // eslint-disable-next-line max-len
        it('should render update-password-form with user and is autenticated true', () => {
            req.login({ user_name: 'myUserName' });
            const expected = {
                'user': req.user,
                'isAutenticated': true,
            };

            controller.updatePasswordForm(req, res);
            expect(res.context).to.be.deep.equal(expected);
        });
    });

    describe('Update password tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /api/users/login if user is not autenticated server ', () => {
            controller.updatePassword(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        it('Should call data users updatePassword', (done) => {
            req.login({ user_name: 'myUserName' });
            const stubUpdate = sinon.stub(data.users, 'updatePassword')
                .returns(Promise.resolve());
            controller.updatePassword(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(stubUpdate).to.be.calledOnce;
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should call data users updatePassword with request body', (done) => {
            req.login({ user_name: 'myUserName' });

            const expectedParam = {
                user_name: 'MyUserName',
                newPassword: 'NewPassword',
            };

            req.body = expectedParam;

            const stubUpdate = sinon.stub(data.users, 'updatePassword')
                .returns(Promise.resolve());
            controller.updatePassword(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(stubUpdate).to.have.been.calledWith(expectedParam);
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should redirect to /api/users/profile after updatePassword', (done) => {
            req.login({ user_name: 'myUserName' });
            const stubUpdate = sinon.stub(data.users, 'updatePassword')
                .returns(Promise.resolve());
            controller.updatePassword(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/api/users/profile');
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });

        it('Should render update-password-form with error', (done) => {
            req.login({ user_name: 'myUserName' });
            const err = 'MyError';
            const stubUpdate = sinon.stub(data.users, 'updatePassword')
                .returns(Promise.reject(err));

            controller.updatePassword(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('update-password-form');
                    expect(res.context.inavalid).to.be.equal(err);
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should render update-password-form with user and authenticated true', (done) => {
            req.login({ user_name: 'myUserName' });
            const err = 'MyError';
            const stubUpdate = sinon.stub(data.users, 'updatePassword')
                .returns(Promise.reject(err));

            const expected = {
                'inavalid': err,
                'user': req.user,
                'isAutenticated': true,
            };
            controller.updatePassword(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('update-password-form');
                    expect(res.context).to.be.deep.equal(expected);
                    stubUpdate.restore();
                    done();
                })
                .catch((error) => {
                    stubUpdate.restore();
                    done(error);
                });
        });
    });

    describe('Profile tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /api/users/login if user is not autenticated server ', () => {
            controller.profile(req, res);
            expect(res.redirectUrl).to.be.equal('/api/users/login');
        });

        // eslint-disable-next-line max-len
        it('should render profile template if user is autenticated server ', () => {
            req.login();
            controller.profile(req, res);
            expect(res.viewName).to.be.equal('profile');
        });

        // eslint-disable-next-line max-len
        it('should render profile template if user is autenticated server with user, user_profile,isAutenticated and showComment',
            () => {
                const user = {
                    user_name: 'MyUserName',
                };
                req.login(user);

                const expected = {
                    'user': req.user,
                    'user_profile': req.user,
                    'isAutenticated': true,
                    'showComment': true,
                };

                controller.profile(req, res);
                expect(res.context).to.be.deep.equal(expected);
            });
    });

    describe('User Profile tests', (done) => {
        it('Should call data users findByUserName with username', () => {
            const username = 'MyUserName';
            req.params = {};
            req.params.username = username;

            const stubFind = sinon.stub(data.users, 'findByUserName')
                .returns(Promise.resolve());

            controller.getUserProfile(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(stubFind).to.have.been.calledOnce;
                    expect(stubFind).to.have.been.calledWith(username);
                    stubFind.restore();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });

        it('Should render profile template with user found', () => {
            const username = 'MyUserName';
            req.params = {};
            req.params.username = username;

            const user = {
                username: username,
            };

            const stubFind = sinon.stub(data.users, 'findByUserName')
                .returns(Promise.resolve(user));

            controller.getUserProfile(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('profile');
                    expect(res.context.user_profile).to.be.deep.equal(user);
                    stubFind.restore();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should render profile template with empty user if not found', () => {
            const username = 'MyUserName';
            req.params = {};
            req.params.username = username;

            const stubFind = sinon.stub(data.users, 'findByUserName')
                .returns(Promise.resolve());

            controller.getUserProfile(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('profile');
                    expect(res.context.user_profile).to.be.deep.equal({});
                    stubFind.restore();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should render profile template with isAutenticated true and my user profile if other user is found', () => {
            req.login({ user_name: 'myUserName' });

            const username = 'OtherUserName';
            req.params = {};
            req.params.username = username;

            const user = {
                username: username,
            };

            const stubFind = sinon.stub(data.users, 'findByUserName')
                .returns(Promise.resolve(user));

            controller.getUserProfile(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('profile');
                    expect(res.context.isAutenticated).to.be.equal(true);
                    stubFind.restore();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });

        // eslint-disable-next-line max-len
        it('Should render profile template with isAutenticated false if user not found', () => {
            const username = 'MyUserName';
            req.params = {};
            req.params.username = username;

            const stubFind = sinon.stub(data.users, 'findByUserName')
                .returns(Promise.resolve());

            controller.getUserProfile(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('profile');
                    expect(res.context.isAutenticated).to.be.equal(false);
                    stubFind.restore();
                })
                .catch((error) => {
                    stubFind.restore();
                    done(error);
                });
        });
    });
});
