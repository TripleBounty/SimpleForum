const passport = require('passport');

module.exports = (app, data) => {
    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.id);
        }
    });

    passport.deserializeUser((id, done) => {
        data.findUserById(id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, false));
    });

    require('./local-strategy-config')(passport, data);

    app.use(passport.initialize());
    app.use(passport.session());
};
