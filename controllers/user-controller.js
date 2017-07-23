/* globals Buffer */

const passport = require('passport');
const AWS = require('aws-sdk');
const bucketConfig = require('../app/config/env-configs/bucket-config');

module.exports = (data) => {
    function registerForm(req, res) {
        data.countries.getAll()
            .then((countries) => {
                res.render('register-form', { countries });
            });
    }

    function register(req, res, next) {
        data.users.create(req.body)
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

    function login(req, res) {
        res.render('login-form');
    }

    function signIn(req, res, next) {
        const auth = passport.authenticate('local', (error, user) => {
            if (error) {
                next(error);
                return;
            }

            if (!user) {
                res.json({
                    success: false,
                    message: 'Invalid name or password!',
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
        }

        res.render('profile', {
            'user': req.user,
            'user_profile': req.user,
            'isAutenticated': true,
        });
    }

    function getUserProfile(req, res) {
        let isAutenticated = false;
        let user;
        if (req.isAuthenticated()) {
            user = req.user;
            isAutenticated = true;
        }

        const username = req.params.username;

        data.users.findByUserName(username)
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
        res.status(200).redirect('/');
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
        login,
        signIn,
        profile,
        getUserProfile,
        logout,
        uploadAvatar,
    };
};
