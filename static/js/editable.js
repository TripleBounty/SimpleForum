/* globals $ */

$(document).ready(() => {
    $('.btnEdit').on('click', (event3) => {
        event3.preventDefault(); // Stop the form from causing a page refresh.
        const element = event3.target;
        $(element).next().removeClass('hidden');        
        $(element).parent().prev().addClass('motherFucker');
        $('.motherFucker').addClass('toDelete')
        
        var name = $(element).parent().prev().text();
        $(element).parent().prev().html('');
        $('<input></input>')
            .attr({
                'type': 'text',
                'name': 'fname',
                'rows': '4',
                'id': 'txt_fullname',
                'size': '70',
                'value': name
            })
            .appendTo('.motherFucker');
        
        $('#txt_fullname').focus();
    });

    $(document).on('blur', '#txt_fullname', function () {
        var name = $(this).val();
        const prevEl = $('.motherFucker').text();
        //alert('Make an AJAX call and pass this parameter >> name=' + name);
        if(name.length != 0){
            $('.motherFucker').text(name);
        }
        $('.motherFucker').removeClass('motherFucker');
    });

    $(document).keypress(function(e) {
    if(e.which == 13) {
        
        var name = $('#txt_fullname').val();
        var id = $('.motherFucker').prev().attr('id')
        var postId = $('.motherFucker').prev().attr('name')
        const prevEl = $('.motherFucker').text();
        $('<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>')
            .attr({
                'name': 'sucess',
                'id': 'txt'
            })
            .prependTo('.motherFucker').next();
            $("span").fadeOut(500);
        
        $.ajax({
            url: '/comment/update',
            data: {
                'commentId': id,
                'postId': postId,
                'data': name,
            },
            method: 'POST',
        }).then((response) => {
            
            if(name.length != 0){
                $('.motherFucker').text(name);
            }
            $('.motherFucker').removeClass('motherFucker');
            $('.btnDelete').addClass('hidden');
        }).catch((err) => {
            console.error(err);
        });
    }
});

});