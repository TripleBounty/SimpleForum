const request = require('supertest');
//const { expect } = require('chai');

const config = require('../../app//config/env-configs/env-configs');
const bucketConfig = require('../../app/config/env-configs/bucket-config');

describe('Route tests', () => {
    let app = null;
    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db')(config.connectionStringTest))
            .then((db) => require('../../data')(db))
            .then((data) => require('../../app/index')(data, bucketConfig))
            .then((_app) => {
                app = _app;
            });
    });

    // router.get('/login', userController.login);
    // router.post('/login', userController.signIn);
    // router.get('/register', userController.registerForm);
    // router.post('/register', userController.register);
    // router.get('/update', userController.updateForm);
    // router.post('/update', userController.update);
    // router.get('/update_password', userController.updatePasswordForm);
    // router.post('/update_password', userController.updatePassword);
    // router.get('/profile', userController.profile);
    // router.get('/profile/:username', userController.getUserProfile);
    // router.get('/logout', userController.logout);

    describe('api-user-routes tests', () => {
        it('login get expect to return 200', (done) => {
            request(app)
                .get('/api/users/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
