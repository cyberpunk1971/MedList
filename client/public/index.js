 const registerForm = document.getElementById('register-form');
 const btn = document.getElementById('submit-btn');
 



// function sendHttpRequest(method, url, data) {
//     return fetch({
//         url: url,
//         method: method,
//         body: JSON.stringify(data),
//         headers: {

//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
    
//             if (response.status >= 200 && response.status < 300) {
//                 return response.json();
//             } else {
//                 return response.json().then(errData => {
//                     console.log(errData);
//                     throw new Error('Server-side error.');
//                 })
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             throw new Error('Somthing went wrong.')
//         })
// }

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





//Register submit
registerForm.addEventListener('submit', event => {
    event.preventDefault();
    const userNameValue = event.currentTarget.querySelector('#username').value;
    const userEmailValue = event.currentTarget.querySelector('#email').value;
    const userPasswordValue = event.currentTarget.querySelector('#password').value;
    createUser(userNameValue, userEmailValue, userPasswordValue);
});





// function registerUser() {
//     form.addEventListener('submit', event => {
//         event.preventDefault();
//         const user = {
//             username: event.currentTarget.querySelector('#username').value,
//             email: event.currentTarget.querySelector('#email').value,
//             password: event.currentTarget.querySelector('#password').value
//         };
//         fetch("http://localhost:5000/api/users/register", {
//             method: 'POST',
//             body: JSON.stringify(user),
//             contentType: 'application/json'
//         }).then(function(error, data) {
//             fetchCall(user);
//         })
//     });
// }

// function loginUser() {
//     loginForm.addEventListener('submit', event => {
//         event.preventDefault();
//         const user = {
//             email: event.currentTarget.querySelector('#email').value,
//             password: event.currentTarget.querySelector('#password').value
//         }
//         fetchCall(user);
//     });
// }

// function fetchCall(user) {
//     fetch("http://localhost:5000/api/users/login", {
//         headers: {
//             'Authorization': 'Basic ' + btoa(`${user.username}: ${user.password}`)
//         },
//         method: 'POST',
//         body: JSON.stringify(userValues),
//         contentType: 'application/json'
//     }).then(function(data, error) {
//         window.location = '/dashboard.html'
//         localStorage.token = body.decodedToken
//     });
// }