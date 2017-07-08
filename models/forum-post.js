class ForumPost {
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
