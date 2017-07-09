/* globals $ */
const firstnameMessage = 'The first name can only consist of alphabetical';
const lastnameMessage = 'The last name can only consist of alphabetical';
const usernameMessage =
    'The username can only consist of alphabetical, number, dot and underscore';

$(document).ready(() => {
    $('#contact_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',
        },
        fields: {
            first_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please enter your First Name',
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: firstnameMessage,
                    },
                },
            },
            last_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please enter your Last Name',
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: lastnameMessage,
                    },
                },
            },
            date: {
                validators: {
                    notEmpty: {
                        message: 'The date is required and cannot be empty',
                    },
                    date: {
                        format: 'MM/DD/YYYY',
                    },
                },
            },
            country: {
                validators: {
                    notEmpty: {
                        message: 'The country is required and can\'t be empty',
                    },
                },
            },
            user_name: {
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please enter your Username',
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: usernameMessage,
                    },
                },
            },
            user_password: {
                validators: {
                    stringLength: {
                        min: 8,
                    },
                    different: {
                        field: 'user_name',
                        message: 'The password cannot be the same as username',
                    },
                    notEmpty: {
                        message: 'Please enter your Password',
                    },
                },
            },
            confirm_password: {
                validators: {
                    stringLength: {
                        min: 8,
                    },
                    identical: {
                        field: 'user_password',
                        message: 'The password and its confirm are not the same',
                    },
                    notEmpty: {
                        message: 'Please confirm your Password',
                    },
                },
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your Email Address',
                    },
                    emailAddress: {
                        message: 'Please enter a valid Email Address',
                    },
                },
            },
            contact_no: {
                validators: {
                    stringLength: {
                        min: 13,
                        max: 13,
                    },
                    notEmpty: {
                        message: 'Please enter your Contact No.',
                    },
                    regexp: {
                        regexp: /^[+0-9]+$/,
                        message: 'The number can only consist of + and number',
                    },
                },
            },
        },
    });
});
