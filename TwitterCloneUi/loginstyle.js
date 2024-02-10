function regisPass() {
    const username = document.getElementById('username-regis').value;
    const password = document.getElementById('password-regis').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (password !== confirmPass) {
        alert("Password do not match. Please re-enter your password.");
        return false;
    } else {
        register(username, password);
    }
}

async function register(username, password) {
    const regisData = {
      username,
      password,
    };
  
    const response = await fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(regisData),
    });
  
    if (!response.ok) {
      throw new Error('Registration failed: ' + (await response.text()));
    }
  
}


async function logIn() {
    const username = document.getElementById('username-log').value;
    const password = document.getElementById('password-log').value;
    sendDatatoLS(username, password);
}


async function sendDatatoLS(username, password) {
    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    if (res.ok) {
        const token = await res.text();
        localStorage.setItem('token', token);
    } else {
        const error = await res.json();
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the default form submission
        await logIn(); // Call the login function when the button is clicked
    });
});

function logSign(){
    let x = document.getElementById('login-box');
    let y = document.getElementById('signup-box');

    if (this.id === 'signup-btn') {
        x.style.transform = 'scale(0)';
        y.style.transform = 'scale(1)';
    } else {
        x.style.transform = 'scale(1)';
        y.style.transform = 'scale(0)';
    }
}

<<<<<<< HEAD
function regisPass() {
    const username = document.getElementById('username-regis').value;
    const password = document.getElementById('password-regis').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (password !== confirmPass) {
        alert("Password do not match. Please re-enter your password.");
        return false;
    } else {
        register(username, password);
    }
}

async function register(username, password) {
    const regisData = {
        "username": username,
        "password": password
    };
    try {
        const res = await fetch('http://localhost:3000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(regisData),
        });
        if (res.ok) {
            const resData = await res.json();
            console.log(resData);
        } else {
            const error = await res.json();
            console.error(error);
        }
    } catch (error) {
        console.error('Error Signing Up:', error);
    }
}

function loginCheck(){
    const usernamelog = document.getElementById('username-log').value;
    const passwordlog = document.getElementById('password-log').value;
    logInNow(usernamelog, passwordlog);
}

async function logInNow(usernamelog, passwordlog){
    try {
        const res = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'joblipat',
                password: 'password'
            })
        })
        if (res.ok) {
            const token = await res.text();
            localStorage.setItem('token', token);
            window.location.href = "http://127.0.0.1:5500/TwitterCloneUi/timeline.html"
        } else {
            const error = await res.json();
            console.error(error);
        }
    } catch (error) {
        console.error('Error Logging In:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the default form submission
        await loginCheck(); // Call the login function when the button is clicked
    });
});

=======
>>>>>>> 4de5a36105ccb42f41572f4432dd6eea3f8f5833
var signx = document.getElementById('signup-btn');
var signy = document.getElementById('login-btn');

signx.addEventListener('click', logSign);
signy.addEventListener('click', logSign);