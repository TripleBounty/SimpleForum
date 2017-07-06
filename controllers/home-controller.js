module.exports = (db) => {
    function getHomePage(req, res) {
        res.status(200).json('home');
    }

    return {
        getHomePage,
    };
};
