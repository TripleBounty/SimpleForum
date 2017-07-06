const LocalStrategy = require('passport-local');
const data = require('../../../data');

const strategy = new LocalStrategy((username, password, done) => {
    data.findUserByCredentials(username, password)
        .then((user) => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        })
        .catch((error) => done(error, null));
});

module.exports = (passport) => passport.use(strategy);
