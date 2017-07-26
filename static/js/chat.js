/* globals $, io */
const handlebars = window.handlebars || window.Handlebars;

$(window).on('load', () => {
    const socket = io.connect('http://localhost:3000');
    const messageField = $('#message');
    const messageContainer = $('#message-container');
    const button = $('#send');
    const body = $('#chatroom-body');

    socket.on('message', (data) => {
        get('chat-message')
            .then((template) => {
                data.date = new Date().toLocaleString();
                messageContainer.append(template(data));
                body.scrollTop(messageContainer.height());
            });
    });

    messageField.on('keypress', (e) => {
        if (e.keyCode === 13) {
            button.trigger('click');
            return false;
        }
        return true;
    });

    button.on('click', () => {
        const text = messageField.val();
        if (text) {
            socket.emit('send', {
                message: text,
            });
        }
        messageField.val('');
    });

    $(window).on('unload', () => {
        socket.emit('disconecte', {});
    });
});

function get(name) {
    const promise = new Promise((resolve, reject) => {
        const url = `/static/templates/${name}.handlebars`;

        $.get(url, (html) => {
            // use handlebars to convert objects to html
            const template = handlebars.compile(html);
            resolve(template);
        });
    });
    return promise;
}
