/* globals $, io */
const handlebars = window.handlebars || window.Handlebars;

window.onload = function() {
    const socket = io.connect('http://localhost:3000');
    const messageField = $('#message');
    const messageContainer = $('#message-container');

    socket.on('message', (data) => {
        get('chat-message')
            .then((template) => {
                data.date = new Date().toLocaleString();
                messageContainer.append(template(data));
            });
    });

    $('#send').on('click', () => {
        const text = messageField.val();
        if (text) {
            socket.emit('send', {
                message: text,
            });
        }
        messageField.val('');
    });
};

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
