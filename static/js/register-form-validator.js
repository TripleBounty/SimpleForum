/* globals $ */

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
                },
            },
            user_password: {
                validators: {
                    stringLength: {
                        min: 8,
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
                        notEmpty: {
                            message: 'Please enter your Contact No.',
                        },
                    },
                },
            },
        },
    });
});
