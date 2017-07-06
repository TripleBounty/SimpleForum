const passport = require('passport');

module.exports = (data) => {
    function login(req, res) {
        res.status(200).send(`
    <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username">
        <input type="text" name="password" placeholder="Password">
        <input type="submit" value="Login">
    </form>
`);
    }

    function register(req, res, next) {
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
        login,
        register,
        profile,
        logout,
    };
};
