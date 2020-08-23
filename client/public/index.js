const form = document.getElementById('register-form');
const btn = document.getElementById('submit-btn');

function sendHttpRequest(method, url, data) {
    return fetch(url, {
        url: url,
        method: method,
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then(errData => {
                console.log(errData);
                throw new Error('Server-side error.');
            })
        }
    })
    .catch(error => {
        console.log(error);
        throw new Error('Somthing went wrong.')
    })
}

async function createUser(username, email, password) {
    
        const user = {
            username: username,
            email: email,
            password: password
        };

        const fd = new FormData(form);
        fd.append('username', username);
        fd.append('email', email);
        fd.append('password', password);

         sendHttpRequest('POST', '/api/users/register', fd);
    
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const userNameValue = event.currentTarget.querySelector('#username').value;
    const userEmailValue = event.currentTarget.querySelector('#email').value;
    const userPasswordValue = event.currentTarget.querySelector('#password').value;
    console.log(userNameValue);
    createUser(userNameValue, userEmailValue, userPasswordValue);
});

