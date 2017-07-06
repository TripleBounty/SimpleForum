const passport = require('passport');
const data = require('../../../data');

passport.serializeUser((user, done) => {
    // minimalistic example - serialize the user id in the session
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser((id, done) => {
    // use the id serialized in the session to retrieve the use from the database
    data.findUserById(id)
        .then((user) => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        })
        .catch((error) => done(error, false));
});

require('./local-strategy-config')(passport);

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};
