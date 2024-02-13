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

function displayUsername(){

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

    //display username of logged user in navbar
    const usernameElement2 = document.getElementById('nav-user');
    if (usernameElement2 !== null){
        usernameElement2.innerHTML = `<h3>${logged_username}</h3>`; 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    displayUsername();
});


//dynamically display all users
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
        // Select the parent element where you want to append the username containers
        const userListContainer = document.querySelector('.suggest-users-container');
  
        // Iterate through the list of usernames and create a div container for each user
        data.forEach((username) => {
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
        });
        console.log(data)

    })
    .catch((error) => {
        console.error("Error fetching from API:", error);
    });
});

async function getFollowing() {
    const token = localStorage.getItem('token');
    //const loggedUsername = getUsernameFromLocalStorage();

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
        console.log('Following:', data); // Assuming data is an array of usernames

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
                </div>
                <button class="follow-btn-1" type="button" onclick="unFollow('follow-btn-1', '1'); unfollowUser();">Following</button>
            `;

            // Append the username container to the user list container
            followed_userListContainer.appendChild(followed_structureContainer);

            // Add event listener to each username element
            followed_structureContainer.querySelector('h3').addEventListener('click', () => {
                // Navigate to profile page with username as query parameter
                window.location.href = `profile.html?username=${encodeURIComponent(username)}`;
            });
        });

    } catch (error) {
        console.error('Error fetching following:', error);
    }
}

// Call the function to fetch the list of following users
getFollowing();


  
//unfollow follow mechanisms
async function unFollow(classID,structNum){
    z = document.querySelector('.'+classID).textContent;
    if (z == 'Follow') {
        document.querySelector('.'+classID).textContent = 'Following';
    } else {
        document.querySelector('.'+classID).textContent = 'Follow';
    }
}



// async function followUser() {
//     const token = localStorage.getItem('token');
//     const rawData = document.getElementById("username");
//     const userToFollow = rawData.value; 

//     const res = await fetch(`http://localhost:3000/api/v1/users/${logged_username}/following/${userToFollow}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({userToFollow})
//     });

//     try {
//         if (!res.ok) {
//             throw new Error(`API request failed with status ${res.status}`);
//         }
//         else {
//             console.log(`Followed: ${userToFollow}`);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function unfollowUser() {
//     const token = localStorage.getItem('token');
//     const rawData = document.getElementById("username");
//     const userToUnfollow = rawData.value; 

//     const res = await fetch(`http://localhost:3000/api/v1/users/${logged_username}/following/${userToUnfollow}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             "Authorization": `Bearer ${token}`
//         }
//     });

//     try {
//         if (!res.ok) {
//             throw new Error(`API request failed with status ${res.status}`);
//         }
//         else {
//             console.log(`Unfollowed: ${userToUnfollow}`);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }
