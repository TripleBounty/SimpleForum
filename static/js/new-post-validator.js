/* globals $ */

$(document).ready(() => {
    $('#new_post_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',
        },
        fields: {
            title: {
                validators: {
                    stringLength: {
                        min: 3,
                        max: 64,
                    },
                    notEmpty: {
                        message: 'Please enter a title for your post',
                    },
                },
            },
            content: {
                validators: {
                    stringLength: {
                        min: 3,
                    },
                    notEmpty: {
                        // eslint-disable-next-line max-len
                        message: 'Your post should contain at least 3 characters',
                    },
                },
            },
        },
    });
});
