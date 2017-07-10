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
        console.log('mitko');
        targetDiv.innerHTML = currentVal + changeingValue;
        const negativeLike = document.getElementById(postId+'d');
        if (negativeLike.classList.contains('inactive')) {
            negativeLike.classList.remove('inactive');
        } else {
            document.getElementById(postId).classList.add('inactive');
        }
    }).catch((err) => {
        console.error(err);
    });
});

$('.hatesLink').on('click', (event) => {
    event.preventDefault(); // Stop the form from causing a page refresh.
    let postId = event.target.id;
    postId = +(postId.substring(0, postId.length - 1));
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
        const positiveLike = document.getElementById(postId);
        if (positiveLike.classList.contains('inactive')) {
            positiveLike.classList.remove('inactive');
        } else {
            event.target.classList.add('inactive');
        }
    }).catch((err) => {
        console.error(err);
    });
});
