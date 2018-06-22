'use strict';

function loadData(url) {
    return new Promise((done, fail) => {
        window[twitterCard] = done;
        const script = document.createElement('script');
        script.src = `${url}?callback=twitterCard`;
        document.body.appendChild(script);
    });
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp');

function twitterCard(data) {
    for (let key in data) {
        if (key === 'wallpaper' || key === 'pic') {
            document.querySelector(`[data-${key}]`).src = data[key];
        } else {
            document.querySelector(`[data-${key}]`).textContent = data[key];
        }
    }
}