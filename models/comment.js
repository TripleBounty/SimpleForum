class Comment {
    static getDataBaseModel(model) {
        const {
            message,
            date,
            user_name,
            avatar,
        } = model;

        return {
            message: message[0],
            postId: message[1],
            parandId: message[2],
            date: date,
            username: user_name,
            img: avatar,
            isDeleted: false,
            comments: [],
        };
    }

    static validate(model) {
        const {
            message,
        } = model;

        const error = [];

        this._validateMessageField('message', 2, 2000, message, error);
        if (error.length !== 0) {
            return 'Invalid values';
        }

        return 'Please fill the field ';
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
