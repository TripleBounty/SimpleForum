const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../env-configs/env-configs');

module.exports = (server) => {
    const io = require('socket.io')(server);

    const onAuthorizeSuccess = (info, accept) => {
        accept(null, true);
    };

    const onAuthorizeFail = (info, message, error, accept) => {
        if (error) {
            throw new Error(message);
        }

        accept(null, false);
    };

    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        store: new MongoStore({ url: config.connectionString }),
        secret: config.secret,
        success: onAuthorizeSuccess,
        error: onAuthorizeFail,
    }));

    io.sockets.on('connection', (socket) => {
        const user = socket.request.user;
        const onlineMessage = {
            username: user.user_name,
            avatar: user.avatar,
            message: 'is now online',
        };

        io.sockets.emit('message', onlineMessage);

        socket.on('send', (data) => {
            const message = {
                username: user.user_name,
                avatar: user.avatar,
                message: data.message,
            };
            io.sockets.emit('message', message);
        });
    });
};
