// Function to retrieve username from localStorage
function getUsernameFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username;
    }
    return null;
}

function displayUsername(){

    const logged_username = getUsernameFromLocalStorage();

    //validation
    if (logged_username) {
        console.log("Username retrieved from localStorage:", logged_username);
    } else {
        console.log("No username found in localStorage.");
    }

    //display username of logged user
    const usernameElement = document.getElementById('user__headerText');
    if (usernameElement !== null){
        usernameElement.innerHTML = `<h3>${logged_username}</h3>`; 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    displayUsername();
});

document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/v1/users/', {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        // Select the username elements in the DOM
        const usernameElements = document.querySelectorAll('.follow__headerText h3');

        // Iterate through the list of users and update the username in each element
        data.forEach((user, index) => {
            if (usernameElements[index]) {
                usernameElements[index].innerHTML = data[index];
            }
        });
        console.log(data);
    })
    .catch((error) => {
        console.error("Error fetching from API:", error);
    });
});