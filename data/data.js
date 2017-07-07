const UserData = require('./users-data');
const PostData = require('./posts-data');

module.exports = (db) => {
    return Promise.resolve({
        users: new UserData(db),
        posts: new PostData(db),
    });
};
