class ForumPost {
    static getDataBaseModel(model) {
        const {
            title,
            content,
            date,
            user_link,
            user_name,
            user_avatar_link,
        } = model;

        return {
            post_title: title,
            post_content: content,
            date: date,
            user_profile: user_link,
            user_name: user_name,
            user_avatar: user_avatar_link,
        };
    }

    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.title === 'string' &&
            typeof model.title.length > 3 &&
            typeof model.content === 'string' &&
            typeof model.content.length > 128;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new ForumPost();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = ForumPost;
