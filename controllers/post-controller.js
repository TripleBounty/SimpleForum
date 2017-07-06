module.exports = (db) => {
    function getPostById(req, res) {
        const id = req.params.postId;

        res.status(200).json(req.db.collection('post').find(id));
    }

    function getAll(req, res) {
        res.status(200).json(req.db.collection('post').find({}));
    }

    return {
        getPostById,
        getAll,
    };
};
