const request = require('supertest');

const config = require('../../app//config/env-configs/env-configs');
const bucketConfig = require('../../app/config/env-configs/bucket-config');

describe('Route tests', () => {
    let app = null;
    before((done) => {
        const defaultuser = {
            avatar: 'https://s3.eu-central-1.amazonaws.com/simple-forum/DefaultAvatar.png',
            first_name: 'testuser',
            last_name: 'testuser',
            date: '2017-07-09',
            country: 'Bulgaria',
            user_name: 'test',
            // eslint-disable-next-line max-len
            user_password: '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578',
            confirm_password: 'testtest',
            email: 'aa@abv.bg',
            contact_no: '+359897856455',
            comments: [],
        };

        const country = {
            'name': 'Bulgaria',
            'code': 'BG',
        };

        const { MongoClient } = require('mongodb');

        MongoClient.connect(config.connectionStringTest)
            .then((db) => {
                return db.dropDatabase()
                    .then(() => {
                        return Promise.all([
                            db.collection('users').insert(defaultuser),
                            db.collection('users').insert(country),
                        ]);
                    });
            })
            .then(() => {
                done();
            });
    });

    beforeEach((done) => {
        Promise.resolve()
            .then(() => require('../../db')(config.connectionStringTest))
            .then((db) => require('../../data')(db))
            .then((data) => require('../../app/index')(data, bucketConfig))
            .then((_app) => {
                app = _app;
            })
            .then(done);
    });

    describe('api-user-routes tests', () => {
        it('expect login get to return 200', (done) => {
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

        it('expect login post to return 200 if user is correct', (done) => {
            request(app)
                .post('/api/users/login')
                .send({ username: 'test', password: 'testtest' })
                .expect(302)
                .expect('Location', '/')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('expect profile get to redirect to /api/users/login', (done) => {
            request(app)
                .get('/api/users/profile')
                .expect(302)
                .expect('Location', '/api/users/login')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('expect profile get to return 200 if user is logged in', (done) => {
            request(app)
                .post('/api/users/login')
                .send({ username: 'test', password: 'testtest' })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    const loginCookie = res.headers['set-cookie'];
                    return request(app)
                        .get('/api/users/profile')
                        .set('cookie', loginCookie)
                        .expect(200)
                        .end((errn, resn) => {
                            if (err) {
                                return done(err);
                            }
                            return done();
                        });
                });
        });

        it('expect register get to return 200', (done) => {
            request(app)
                .get('/api/users/register')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        // eslint-disable-next-line max-len
        it('expect register post to return 200 and redirect home if user is created', (done) => {
            const user = {
                avatar: 'https://s3.eu-central-1.amazonaws.com/simple-forum/DefaultAvatar.png',
                first_name: 'testuser',
                last_name: 'testuser',
                date: '2017-07-09',
                country: 'Bulgaria',
                user_name: 'user' + Math.random(),
                user_password: 'aabbaabb',
                confirm_password: 'aabbaabb',
                email: 'aa@abv.bg',
                contact_no: '+359897856455',
            };

            request(app)
                .post('/api/users/register')
                .send(user)
                .expect(302)
                .expect('Location', '/')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect update get to redirect /api/users/login', (done) => {
            request(app)
                .get('/api/users/update')
                .expect(302)
                .expect('Location', '/api/users/login')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('expect update get to return 200 if user is logged in', (done) => {
            request(app)
                .post('/api/users/login')
                .send({ username: 'test', password: 'testtest' })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    const loginCookie = res.headers['set-cookie'];
                    return request(app)
                        .get('/api/users/update')
                        .set('cookie', loginCookie)
                        .expect(200)
                        .end((errn, resn) => {
                            if (err) {
                                return done(err);
                            }
                            return done();
                        });
                });
        });

        // eslint-disable-next-line max-len
        it('expect update post to redirect to profile page after update', (done) => {
            const user = {
                avatar: 'https://s3.eu-central-1.amazonaws.com/simple-forum/DefaultAvatar.png',
                first_name: 'testuser',
                last_name: 'testuser',
                date: '2017-07-09',
                country: 'Bulgaria',
                user_name: 'test',
                user_password: 'testtest',
                confirm_password: 'testtest',
                email: 'aa@abv.bg',
                contact_no: '+359897856455',
            };

            request(app)
                .post('/api/users/login')
                .send({ username: 'test', password: 'testtest' })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    const loginCookie = res.headers['set-cookie'];
                    return request(app)
                        .post('/api/users/update')
                        .set('cookie', loginCookie)
                        .send(user)
                        .expect(302)
                        .expect('Location', '/api/users/profile')
                        .end((err1, res1) => {
                            if (err1) {
                                return done(err1);
                            }
                            return done();
                        });
                });
        });
    });
});
