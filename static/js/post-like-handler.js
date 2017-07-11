/* globals $ */
const changeingValue = 1;

for (let i= 0; i <200; i++) {
    if (document.cookie.match(i+'d')) {
        if (document.getElementById(i+'d')!== null) {
        document.getElementById(i+'d').classList.add('inactive');
        }
    }
    if (document.cookie.match(i+'l')) {
        if (document.getElementById(i+'l')!== null) {
        document.getElementById(i+'l').classList.add('inactive');
        }
    }
}

$('.likesLink').on('click', (event) => {
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
            'node': changeingValue,
            'postType': 'l',
        },
        method: 'POST',
    }).then((response) => {
        targetDiv.innerHTML = currentVal + changeingValue;
        const negativeLike = document.getElementById(postId+'d');
        if (negativeLike.classList.contains('inactive')) {
            negativeLike.classList.remove('inactive');
        } else {
            event.target.classList.add('inactive');
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
            'postType': 'd',
        },
        method: 'POST',
    }).then((response) => {
        targetDiv.innerHTML = currentVal - changeingValue;
        const positiveLike = document.getElementById(postId+'l');
        if (positiveLike.classList.contains('inactive')) {
            positiveLike.classList.remove('inactive');
        } else {
            event.target.classList.add('inactive');
        }
    }).catch((err) => {
        console.error(err);
    });
});
