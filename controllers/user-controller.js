const passport = require('passport');

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
            'isAutenticated': true,
        });
    }

    function logout(req, res) {
        req.logout();
        res.status(200).redirect('/');
    }

    return {
        register,
        registerForm,
        login,
        signIn,
        profile,
        logout,
    };
};
