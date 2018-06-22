'use strict';

const content = document.querySelector('.content');

function loadData(callbackName, url) {
    return new Promise((done, fail) => {
        const script = document.createElement('script');
        script.src = `${url}?callback=${callbackName}`;
        document.body.appendChild(script);
        window.callbackName = done;
    });
}

loadData('profileData', 'https://neto-api.herokuapp.com/profile/me');

function profileData(data) {
    for (const key in data) {
        switch(key) {
            case 'id':
                loadData('technologies', `https://neto-api.herokuapp.com/profile/${data[key]}/technologies`)
                    .then(content.removeAttribute('style'));
                break;
            case 'pic':
                document.querySelector(`[data-${key}]`).src = data[key];
                break;
            default:
                document.querySelector(`[data-${key}]`).textContent = data[key];
        }
    }
}

function technologies(data) {
    const listTechnology = document.querySelector('[data-technologies]');
    for (const key in data) {
        const item = document.createElement('span');
        item.classList.add('devicons', `devicons-${data[key]}`);
        listTechnology.appendChild(item);
    }
}
