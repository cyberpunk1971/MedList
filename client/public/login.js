const loginForm = document.getElementById('login-form');



async function loginUser (email, password) {
    const user = {
        email,
        password
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
    console.log('hello');
    fetch("http://localhost:5000/api/users/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            localStorage.token = result.token
            window.location = '/client/public/dashboard.html'
        })
        .catch(error => console.log('error', error));

}

//Login submit
loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const userEmailValue = event.currentTarget.querySelector('#email').value;
    const userPasswordValue = event.currentTarget.querySelector('#password').value;
    loginUser(userEmailValue, userPasswordValue);
});