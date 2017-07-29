class Post {
    static getDataBaseModel(model) {
        const {
            title,
            content,
            date,
            nodes,
            user_name,
            avatar,
        } = model;

        return {
            title: title,
            content: content,
            date: date,
            nodes: nodes,
            username: user_name,
            img: avatar,
            isDeleted: false,
            comments: [],
        };
    }

    static validate(model) {
        const {
            title,
            content,
        } = model;

        const error = [];

        this._validateTitleField('title', 3, 64, title, error);
        this._validateContentTextBox('content', 3, content, error);
        if (error.length !== 0) {
            return 'Invalid values';
        }

        return 'no';
    }

    static _validateTitleField(name, min, max, field, error) {
        if (min > field.length && field.length < max) {
            error.push({
                field: name,
                message: 'Invalid field ${name}',
            });
        }
    }

    static _validateContentTextBox(name, min, field, error) {
        if (field.length < min) {
            error.push({
                field: name,
                message: 'Too short ${name}',
            });
        }
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
