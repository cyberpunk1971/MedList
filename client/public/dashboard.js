const xhr = new XMLHttpRequest;

xhr.open('POST', '/api/users');

xhr.responseType = 'json';

xhr.onload = function() {
    const listOfMeds = xhr.response;
    for (const med of listOfMeds) {
        const medEl = document.importNode(medTemplate.content, true);
        medEl.querySelector('li').textContent = med.name;
        listElement.append(medEl);
    }
};

xhr.send();

const listElement = document.querySelector('.meds');
const medTemplate = document.getElementById('single-med');