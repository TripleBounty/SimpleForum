/* globals $ */

$('.likesLink').on('click', function(event) {
    event.preventDefault(); // Stop the form from causing a page refresh.
    console.log(event.target);
    const postId = event.target.id;
    const elemntToChange = 'positive' + postId;
    const targetDiv = document.getElementById(elemntToChange);
    const currentVal = parseFloat(targetDiv.innerHTML);
    targetDiv.innerHTML = currentVal + 1;
    document.getElementById(postId).classList.add('inactive');
    $.ajax({
        url: '/increase-likes/'+ postId,
        method: 'POST',
    }).then(function(response) {
        $('body').append(response);
    }).catch(function(err) {
        console.error(err);
    });
});
