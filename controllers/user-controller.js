/* globals Buffer */

const passport = require('passport');
const AWS = require('aws-sdk');

module.exports = (data, bucketConfig) => {
    function registerForm(req, res) {
        return data.countries.getAll()
            .then((countries) => {
                res.render('register-form', { countries });
            });
    }

    function register(req, res, next) {
        return data.users.create(req.body)
            .then(() => {
                req.body = {
                    username: req.body.user_name,
                    password: req.body.user_password,
                };

                signIn(req, res, next);
            })
            .catch((error) => {
                data.countries.getAll()
                    .then((countries) => {
                        res.render('register-form',
                            { inavalid: error, countries: countries });
                    });
            });
    }

    function updateForm(req, res) {
        if (!req.isAuthenticated()) {
            return Promise.resolve(
                res.status(401).redirect('/api/users/login'));
        }

        return data.countries.getAll()
            .then((countries) => {
                res.render('update-form', {
                    'countries': countries,
                    'user': req.user,
                    'isAutenticated': true,
                });
            });
    }

    function update(req, res, next) {
        if (!req.isAuthenticated()) {
            return Promise.resolve(
                res.status(401).redirect('/api/users/login'));
        }

        const body = req.body;
        body.user_name = req.user.user_name;

        return data.users.update(body)
            .then(() => {
                res.redirect('/api/users/profile');
            })
            .catch((error) => {
                data.countries.getAll()
                    .then((countries) => {
                        res.render('update-form', {
                            'inavalid': error,
                            'countries': countries,
                            'user': req.user,
                            'isAutenticated': true,
                        });
                    });
            });
    }

    function updatePasswordForm(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/api/users/login');
            return;
        }

        res.render('update-password-form', {
            'user': req.user,
            'isAutenticated': true,
        });
    }

    function updatePassword(req, res, next) {
        if (!req.isAuthenticated()) {
            return Promise.resolve(
                res.status(401).redirect('/api/users/login'));
        }

        const body = req.body;

        return data.users.updatePassword(body)
            .then(() => {
                res.redirect('/api/users/profile');
            })
            .catch((error) => {
                res.render('update-password-form', {
                    'inavalid': error,
                    'user': req.user,
                    'isAutenticated': true,
                });
            });
    }

    function login(req, res) {
        res.render('login-form', { 'isAutenticated': false });
    }

    function signIn(req, res, next) {
        const auth = passport.authenticate('local', (error, user) => {
            if (error) {
                next(error);
                return;
            }

            if (!user) {
                res.render('login-form', {
                    'inavalid': 'Invalid name or password!',
                });
            }

            req.login(user, (e) => {
                if (e) {
                    next(e);
                    return;
                }

                res.redirect('/');
            });
        });

        auth(req, res, next);
    }

    function profile(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/api/users/login');
            return;
        }

        const commentsObject = _getComments(req.user, req.query);

        res.render('profile', {
            'user': req.user,
            'user_profile': req.user,
            'isAutenticated': true,
            'showComment': true,
            'commentsObject': commentsObject,
        });
    }

    function _getComments(user, query) {
        const maxOnPage = 3;
        const activeComments = user.comments
            .filter((c) => c.isDeleted === false);
        const total = activeComments.length;
        const maxPage = Math.ceil(total / maxOnPage);
        let page = +(query.page || '1');
        page = page < 1 ? 1 : page;
        page = page > maxPage ? maxPage : page;

        const comments = activeComments
            .sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
            .slice((page - 1) * maxOnPage, page * maxOnPage);

        return {
            comments,
            total: total,
            currentPage: page,
            prevPage: page - 1,
            nextPage: page + 1,
            maxPage: maxPage,
        };
    }

    function getUserProfile(req, res) {
        let isAutenticated = false;
        let user;
        if (req.isAuthenticated()) {
            user = req.user;
            isAutenticated = true;
        }

        const username = req.params.username;

        return data.users.findByUserName(username)
            .then((userProfile) => {
                if (userProfile) {
                    res.render('profile', {
                        'user': user,
                        'user_profile': userProfile,
                        'isAutenticated': isAutenticated,
                    });
                } else {
                    res.render('profile', {
                        'user': user,
                        'user_profile': {},
                        'isAutenticated': isAutenticated,
                    });
                }
            });
    }

    function logout(req, res) {
        req.logout();
        res.redirect('/');
    }

    function uploadAvatar(req, res) {
        const s3Bucket = _connectBucket();

        const image = req.body.image;
        const imageData = image.replace(/^data:image\/\w+;base64,/, '');

        const buf = Buffer.from(imageData, 'base64');

        const datetime = new Date();

        // eslint-disable-next-line max-len
        const imgName = `img_${datetime.getFullYear()}_${datetime.getMonth()}_${datetime.getDate()}_${datetime.getTime()}.png`;

        const imgData = {
            Key: imgName,
            Body: buf,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: 'image/png',
        };

        s3Bucket.upload(imgData, (err, imgDataBucket) => {
            if (err) {
                res.status(400).send({ 'url': bucketConfig.defaultAvatar });
            } else {
                res.status(200).send({ 'url': imgDataBucket.Location });
            }
        });
    }

    function _connectBucket() {
        const loginProfile = {
            'accessKeyId': bucketConfig.accessKeyId,
            'secretAccessKey': bucketConfig.secretAccessKey,
            'region': bucketConfig.region,
        };

        AWS.config.update(loginProfile);

        return new AWS.S3({ params: { Bucket: bucketConfig.name } });
    }

    return {
        register,
        registerForm,
        update,
        updateForm,
        updatePassword,
        updatePasswordForm,
        login,
        signIn,
        profile,
        getUserProfile,
        logout,
        uploadAvatar,
    };
};
