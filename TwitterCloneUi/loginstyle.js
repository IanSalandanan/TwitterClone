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

function regisPass(event) {
    event.preventDefault();
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

function verifyLog() {
    $.getJSON('AUTH.json', function(json) {
        var users = [];
        const username = document.getElementById('username-log').value;
        const password = document.getElementById('password-regis').value;
        for (var key in json) {
            if (json.hasOwnPropert(key)) {
                var item = json[key];
                users.push({
                    usersName: item.username,
                    userPass: item.password
                });
            }
        }
        if ((username in users) && (password in users)) {
            alert('Successfully Logged In')
            login()
        } else {
            alert('Username/Password is incorrect.')
            return false;
        }
    })
}

async function login() {
    const res = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "joblipat",
            password: "password"
        })
    })
    const token = await res.text();
    console.log(token);
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

    localStorage.setItem = res.text();
}

var signx = document.getElementById('signup-btn');
var signy = document.getElementById('login-btn');

signx.addEventListener('click', logSign);
signy.addEventListener('click', logSign);