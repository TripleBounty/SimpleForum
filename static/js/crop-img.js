/* globals $ */

const $uploadCrop = $('#upload-img-avatar').croppie({
    enableExif: true,
    viewport: {
        width: 200,
        height: 200,
        type: 'rectangle',
    },
    boundary: {
        width: 400,
        height: 300,
    },
});

$('#upload').on('change', function () {
    const reader = new FileReader();
    reader.onload = (e) => {
        $uploadCrop.croppie('bind', {
            url: e.target.result,
        });
    };
    reader.readAsDataURL(this.files[0]);
});

const $modal = $('#upload-avatar');
$modal.on('click', '#upload-avatar-OK', function (e) {
    $uploadCrop.croppie('result', {
        type: 'canvas',
        size: 'viewport',
    }).then((resp) => {
        const $body = $('body');
        $body.addClass('loading');
        console.log(resp);
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: { 'image': resp },
            success: (data) => {
                $('#avatar-img').attr('src', data.url);
                $('#input-avatar-img').attr('value', data.url);
                $modal.modal('hide');
                $body.removeClass('loading');
            },
            error: (data) => {
                $('#avatar-img').attr('src', data.url);
                $('#input-avatar-img').attr('value', data.url);
                $modal.modal('hide');
                $body.removeClass('loading');
            },
        });
    });
});
