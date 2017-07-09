/* globals $ */

$('.likesLink').on('click', (event) => {
    event.preventDefault(); // Stop the form from causing a page refresh.
    const postId = event.target.id;
    const elemntToChange = 'positive' + postId;
    const targetDiv = document.getElementById(elemntToChange);
    const currentVal = parseFloat(targetDiv.innerHTML);

    $.ajax({
        url: '/vote',
        data: {
            'postId': postId,
            'node': 1,
        },
        method: 'POST',
    }).then((response) => {
        targetDiv.innerHTML = currentVal + 1;
        document.getElementById(postId).classList.add('inactive');
    }).catch((err) => {
        console.error(err);
    });
});
