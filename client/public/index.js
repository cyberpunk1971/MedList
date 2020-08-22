// const registerForm = document.getElementById('register-form');
// const registerBtn = document.getElementById('submit-btn');



// // const successResponse = (url) => {
// //     if (url === '/api/users/register') {
        
// //     }
// // }



// const httpRequest = (method, url, queryParams) => {
//     const http = new XMLHttpRequest();
//     url = 'http://localhost:5000' + url 
    
//     http.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log('request sent.');
//         }
//     }
//     if (method === 'POST') {
//         http.open('POST', url, true);
//         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     }
//     console.log(queryParams);
//     http.send(queryParams);
// }

// registerForm.onsubmit = function(event) {
//     event.preventDefault();
// const usernameValue = document.getElementById('username').value;
// const emailValue = document.getElementById('email').value;
// const passwordValue = document.getElementById('password').value;
// console.log(usernameValue);
   
//     let queryParams = ''
//     queryParams = 'username=' + usernameValue + '&email='+ emailValue + '&password=' + passwordValue;
//     httpRequest('POST', '/api/users/register', queryParams);
    
    
// };


