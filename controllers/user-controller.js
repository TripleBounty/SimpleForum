module.exports = (db) => {
    function getUserById(req, res) {
        const id = req.params.userId;

        res.status(200)
            .json(req.db.collection('user'))
            .find(id);
        }

    return {
        getUserById,
    };
};
