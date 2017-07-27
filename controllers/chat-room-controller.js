module.exports = (data) => {
    function showRoom(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/api/users/login');
            return;
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
