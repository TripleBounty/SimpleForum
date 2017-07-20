class Comment {
        static getDataBaseModel(model) {
        const {
            message,
            date,
            user_name,
            user_avatar,
        } = model;

        return {
            message: message,
            date: date,
            username: user_name,
            img: user_avatar,
            comments: [],
        };
    }
static toViewModel(model) {
        const viewModel = new Comment();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Comment;
