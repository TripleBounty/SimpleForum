// Simple data to be replaced with mongodb

const db = {
    users: [
        {
            id: 1,
            username: 'krutz',
            password: '1234',
        },
    ],
};

function findUserById(id) {
    const user = db.users.find((u) => u._id === id);

    return Promise.resolve(user || null);
}

function findUserByCredentials(username, password) {
    const user = db.users.find((u) => u.username === username &&
        u.password === password);

    return Promise.resolve(user || null);
}

module.exports = {
    findUserById,
    findUserByCredentials,
};
