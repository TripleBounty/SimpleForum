/* globals $ */

$(document).ready(() => {
    $('#new_post_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',
        },
        fields: {
            post_title: {
                validators: {
                    stringLength: {
                        min: 3,
                    },
                    notEmpty: {
                        message: 'Please enter a title for your post',
                    },
                },
            },
            post_content: {
                validators: {
                    stringLength: {
                        min: 128,
                    },
                    notEmpty: {
                        message: 'Your post should contain at least 128 characters',
                    },
                },
            },
        },
    });
});
