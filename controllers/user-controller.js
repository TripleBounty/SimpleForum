const passport = require('passport');

module.exports = (data) => {
    function registerForm(req, res) {
        data.countries.getAll()
            .then((countries) => {
                res.render('register-form', { countries });
            });
    }

    function register(req, res) {
        data.users.create(req.body)
            .then(() => {
                res.redirect('/');
            })
            .catch((error) => {
                res.render('register-form', { inavalid: error });
            });
    }

    function login(req, res) {
        res.render('login-form');
    }

    function signIn(req, res, next) {
        const auth = passport.authenticate('local', function(error, user) {
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

                res.redirect('/profile');
            });
        });

        auth(req, res, next);
    }

    function profile(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/unauthorized');
        }

        res.status(200).send(`Welcome, ${req.user.username}`);
    }

    function logout(req, res) {
        req.logout();
        res.status(200).redirect('/login');
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
