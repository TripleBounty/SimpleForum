/* globals $ */

$(document).ready(() => {
    $('.btnDelete').on('click', (event3) => {
        event3.preventDefault(); // Stop the form from causing a page refresh.
        const element = event3.target;
        var id = $('.toDelete').prev().attr('id');
        var postId = $('.toDelete').prev().attr('name');
        console.log('pp');
        $.ajax({
            url: '/comment/delete',
            data: {
                'commentId': id,
                'postId': postId,
            },
            method: 'POST',
        }).then((response) => {
            
            document.location.href = '/forum-post/' + postId;
            
        }).catch((err) => {
            console.error(err);
        });
    });
});
