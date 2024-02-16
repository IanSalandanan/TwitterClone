

// Function to retrieve username from localStorage
function getUsernameFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username;
    }
    return null;
}

var logged_username = getUsernameFromLocalStorage();

function displayNavUsername(){

    //validation
    if (logged_username) {
        console.log("Username retrieved from localStorage:", logged_username);
    } else {
        console.log("No username found in localStorage.");
    }

    //display username of logged user in navbar
    const usernameElement2 = document.getElementById('nav-user');
    if (usernameElement2 !== null){
        usernameElement2.innerHTML = `<h3>${logged_username}</h3>`; 
    }
}

function displayHeaderUsername(){
    //display username of logged user in folllowing page header
    const usernameElement = document.getElementById('user__headerText');
    if (usernameElement !== null){
        usernameElement.innerHTML = `<h3>${logged_username}</h3>`; 
    }
}

function displayUsersToFollow(){
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
        // Select the parent element where you want to append the username containers
        const userListContainer = document.querySelector('.suggest-users-container');
    
        let usernamesAdded = 0;
        //const followedUsers = getFollowing();

        getFollowing().then((followedUsers) => { 

            if (!followedUsers || followedUsers.length === 0){console.log("list is empty, gawan mo na ng display"); }
            // Iterate through the list of usernames and create a div container for each user
            data.forEach((username) => {   
                
                if (followedUsers.includes(username)){return;} //?!?!?!?! determine bat di nalang token === username
                else if (username === logged_username){return;}
                else if (usernamesAdded >= 3){return;}
                
                    // Create a new div element for the username container
                const usernameContainer = document.createElement('div');
                usernameContainer.classList.add('suggest-usernames');
    
                // Set the inner HTML of the username container to the username
                usernameContainer.innerHTML = username;
    
                // Append the username container to the user list container
                userListContainer.appendChild(usernameContainer);
                
                // Add event listener to each username element
                usernameContainer.addEventListener('click', () => {
                // Navigate to profile page with username as query parameter
                window.location.href = `profile.html?username=${encodeURIComponent(username)}`;
                });
                    
                usernamesAdded++;           
            });
            console.log(data)
            
        });
    })
    .catch((error) => {
        console.error("Error fetching from API:", error);
    });

}

//get list of followed users
async function getFollowing() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/api/v1/users/${logged_username}/following`, {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch following: ${response.status}`);
        }

        const data = await response.json();
        console.log('Following:', data);       

        // Select the parent element where you want to append the username containers
        const followed_userListContainer = document.querySelector('.follow__structure');

        // Iterate through the list of usernames and create a div container for each user
        data.forEach((username) => {
            // Create a new div element for the username container
            const followed_structureContainer = document.createElement('div');
            followed_structureContainer.classList.add('follow__structureContainer');

            // Set the inner HTML of the username container to include the username and follow button
            followed_structureContainer.innerHTML = `
                <div class="follow__avatar" alt="avatar">
                    <span class="material-symbols-outlined">account_circle</span>
                </div>
                <div class="follow__body">
                    <div class="follow__userHeader">
                        <div class="follow__userHeaderText">
                            <h3>${username}</h3>
                        </div>
                    </div>
                </div>`;

            // Append the username container to the user list container
            followed_userListContainer.appendChild(followed_structureContainer);

            // Add event listener to each username element
            followed_structureContainer.querySelector('h3').addEventListener('click', () => {
                // Navigate to profile page with username as query parameter
                window.location.href = `profile.html?username=${encodeURIComponent(username)}`;
            });
        });
        return data;

    } catch (error) {
        console.error('Error fetching following:', error);
    }
}

// connected sya sa profle - para ma-change yung profile name at username kay suggested user
function addSuggestedUserClickListeners() {
    const suggestedUserLinks = document.querySelectorAll('.suggested-user');
    suggestedUserLinks.forEach(function (userLink) {
        userLink.addEventListener('click', function(event) {
            event.preventDefault();
            const clickedUsername = event.target.textContent.trim();
            updateUrlParameter('username', clickedUsername);
            window.location.href = 'profile.html';
        });
    });

    function updateUrlParameter(key, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }
}

//When DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    displayUsersToFollow();
    displayNavUsername();
    displayHeaderUsername();   
    addSuggestedUserClickListeners();
});

// function refreshFollowingPage() {
//     window.location.reload(true); // Reloads the page from the server, ignoring the cache
// }

function logOut(event) {
    window.location.href = "login.html";
    localStorage.removeItem("token");
  }

