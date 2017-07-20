const UserData = require('./users-data');
const PostData = require('./posts-data');
const CountrieData = require('./countries-data');
//const CommentData = require('./comment-data');

module.exports = (db) => {
    return Promise.resolve({
        users: new UserData(db),
        posts: new PostData(db),
        countries: new CountrieData(db),
        //comments: new CommentData(db),
    });
};
