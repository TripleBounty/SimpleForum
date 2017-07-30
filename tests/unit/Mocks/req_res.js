const getRequestMock = (options = {}) => {
    const req = {
        body: {},
        user: '',
        post: '',
        postId: '',
        node:'',
        postType:'', 
        _isAuthenticated: false,
        isAuthenticated() {
            return this._isAuthenticated;
        },
        logout() {
            this._isAuthenticated = false;
            this.user = '';
        },
        login(user) {
            this._isAuthenticated = true;
            this.user = user;
        },
    };

    Object.keys(options)
        .forEach((key) => {
            req[key] = options[key];
        });
    return req;
};

const getResponseMock = () => {
    return {
        viewName: '',
        model: null,
        context: {},
        redirectUrl: '',
        render(viewName, context) {
            this.viewName = viewName;
            this.context = context;
            return this;
        },
        cookie() {
            value = 'pruc';
            session = 'session';
            {maxAge: 9999};
            return this;        
        },
        status(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        send(body) {
            this.body = body;
            return this;
        },
        redirect(status, url) {
            if (!url) {
                this.redirectUrl = status;
            } else {
                this.redirectUrl = url;
                this.status = status;
            }

            return this;
        },
    };
};

module.exports = { getRequestMock, getResponseMock };
