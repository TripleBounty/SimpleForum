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
            $(element).next().find( 'input' ).attr('name', 'message');
            $(element).next().find('button').attr('formmethod', 'post');
        }).catch((err) => {
            console.error(err);
        });
    });
});
