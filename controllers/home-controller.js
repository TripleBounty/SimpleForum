module.exports = () => {
    function getHomePage(req, res) {
        res.status(200)
            .send('<h1>Home</h1>');
    }

    return {
        getHomePage,
    };
};
