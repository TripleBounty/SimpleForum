/* globals $ */

$(document).ready(() => {
    $('.btnComment').on('click', (event3) => {
        event3.preventDefault(); // Stop the form from causing a page refresh.
        $.ajax({
            url: '/comment',
            data: {},
            method: 'GET',
        }).then((response) => {
            const element = event3.target;
            $(element).next().removeClass('visibleHiddnen');
            $(element).next().find('input').attr('name', 'message');
            $(element).next().find('button').attr('formmethod', 'post');
        }).catch((err) => {
            console.error(err);
        });
    });

    // eslint-disable-next-line max-len
    const firstnameMessage = 'The comment can only consist of alphabetical, number, dot and underscore';

    $('.share').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',
        },
        fields: {
            message: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'The country is required and can\'t be empty',
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: firstnameMessage,
                    },
                },
            },
        },
    });
});
