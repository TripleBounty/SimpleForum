/* globals $ */
const changeingValue = 1;

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
            'node': changeingValue,
        },
        method: 'POST',
    }).then((response) => {
        targetDiv.innerHTML = currentVal + changeingValue;
        document.getElementById(postId).classList.add('inactive');
    }).catch((err) => {
        console.error(err);
    });
});

$('.hatesLink').on('click', (event) => {
    event.preventDefault(); // Stop the form from causing a page refresh.
    const postId = event.target.id;
    const elemntToChange = 'positive' + postId;
    const targetDiv = document.getElementById(elemntToChange);
    const currentVal = parseFloat(targetDiv.innerHTML);
    $.ajax({
        url: '/vote',
        data: {
            'postId': postId,
            'node': -changeingValue,
        },
        method: 'POST',
    }).then((response) => {
        targetDiv.innerHTML = currentVal - changeingValue;
        event.target.classList.add('inactive');
    }).catch((err) => {
        console.error(err);
    });
});
