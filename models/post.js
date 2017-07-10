class Post {
        static getDataBaseModel(model) {
        const {
            title,
            content,
            date,
            user_name,
            user_avatar,
        } = model;

        return {
            title: title,
            content: content,
            date: date,
            username: user_name,
            img: user_avatar,
            comments: [],
        };
    }

    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.title === 'string' &&
            model.title.length > 2 &&
            typeof model.content === 'string' &&
            model.content.length > 32;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Post();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Post;
