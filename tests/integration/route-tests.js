const request = require('supertest');

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
