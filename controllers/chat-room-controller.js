module.exports = (data) => {
    function showRoom(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/api/users/login');
        }

        res.render('chat-room', {
            'user': req.user,
            'isAutenticated': true,
        });
    }

    return {
        showRoom,
    };
};
