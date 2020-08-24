const form = document.getElementById('register-form');
const btn = document.getElementById('submit-btn');
const loginForm = document.getElementById('login-form');

function sendHttpRequest(method, url, data) {
    return fetch({
        url: url,
        method: method,
        body: JSON.stringify(data),
        headers: {

            'Accept': 'application/json, text/plain, */*',
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

    // const fd = new FormData(form);
    // fd.append('username', username);
    // fd.append('email', email);
    // fd.append('password', password);

    //  sendHttpRequest('POST', 'http://localhost:5000/api/users/register', fd);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
        //redirect: 'follow'
    };

    fetch("http://localhost:5000/api/users/register", requestOptions)
        .then(response => response.text())
        .then(result => {
            window.location = '/client/public/dashboard.html'
        })
        .catch(error => console.log('error', error));

}

async function loginUser (email, password) {
    const user = {
        email: email,
        password: password
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json", {
        'Authorization': 'Basic' + btoa({
            email: email, 
            password: password
        })
    });

    const raw = JSON.stringify(user);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
        //redirect: 'follow'
    };

    fetch("http://localhost:5000/api/users/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            window.location = '/client/public/dashboard.html'
        })
        .catch(error => console.log('error', error));

}

form.addEventListener('submit', event => {
    event.preventDefault();
    const userNameValue = event.currentTarget.querySelector('#username').value;
    const userEmailValue = event.currentTarget.querySelector('#email').value;
    const userPasswordValue = event.currentTarget.querySelector('#password').value;
    createUser(userNameValue, userEmailValue, userPasswordValue);
});

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const userEmailValue = event.currentTarget.querySelector('#email').value;
    const userPasswordValue = event.currentTarget.querySelector('#password').value;
    loginUser(userEmailValue, userPasswordValue);
});

