/**HEART BUTTON TRANSITION FUNCTION**/
function toggleLike(button) {
  button.classList.toggle("liked");
}

// Function to parse URL query parameters
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the username from the URL query parameter
  const username = getQueryParam("username");

  // Select the element to display the username
  const usernameElement = document.getElementById("profile-name");

  // Set the inner HTML of the element with the username
  usernameElement.innerHTML = `<span>${username}</span>`;
});




async function unFollow(classID, structNum) {
  const followButton = document.querySelector('.' + classID);
  const username = getQueryParam("username"); // Get username from URL query parameter
  
  if (followButton.textContent === 'Follow') {
    followButton.textContent = 'Following';
    followUser(username);
  } else {
    followButton.textContent = 'Follow';
    // Implement unfollow functionality if needed
  }
}

//
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

  // //display username of logged user
  // const usernameElement = document.getElementById('user__headerText');
  // if (usernameElement !== null){
  //     usernameElement.innerHTML = `<h3>${logged_username}</h3>`; 
  // }
}

document.addEventListener("DOMContentLoaded", function() {
  displayUsername();
});
//

async function followUser(usernameToFollow) {
  const token = localStorage.getItem('token');
  //const loggedUsername = localStorage.getItem('logged_username');

  const res = await fetch(`http://localhost:3000/api/v1/users/${logged_username}/following/${usernameToFollow}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  try {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    } else {
      console.log(`Followed: ${usernameToFollow}`);
    }
  } catch (error) {
    console.error(error);
  }
}


// async function followUser() {
//   const token = localStorage.getItem('token');
//   const getUsername = document.getElementById("username");
//   //const userToFollow = getUsername.value; 

//   const res = await fetch(`http://localhost:3000/api/v1/users/${loggedUsername}/following/${usernameToFollow}`, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({getUsername})
//   });

//   try {
//       if (!res.ok) {
//           throw new Error(`API request failed with status ${res.status}`);
//       }
//       else {
//           console.log(`Followed: ${getUsername}`);
//       }
//   } catch (error) {
//       console.error(error);
//   }
// }

// async function unfollowUser() {
//   const token = localStorage.getItem('token');
//   const rawData = document.getElementById("username");
//   const userToUnfollow = rawData.value; 

//   const res = await fetch(`http://localhost:3000/api/v1/users/${logged_username}/following/${userToUnfollow}`, {
//       method: 'DELETE',
//       headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `Bearer ${token}`
//       }
//   });

//   try {
//       if (!res.ok) {
//           throw new Error(`API request failed with status ${res.status}`);
//       }
//       else {
//           console.log(`Unfollowed: ${userToUnfollow}`);
//       }
//   } catch (error) {
//       console.error(error);
//   }
// }



// //get followed user's names
// document.addEventListener("DOMContentLoaded", function() {
//   const container = document.getElementById('follow__structureContainer');
//   container.innerHTML = "";
//   const token = localStorage.getItem('token');

//   fetch('http://localhost:3000/api/v1/users/', {
//       method: 'GET',
//       headers: {
//           "Accept": "application/json",
//           "Authorization": `Bearer ${token}`
//       }
//   })
//   .then((response) => {
//       if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//       }
//       constresponse.json();
//   })
//   .then((data) => {
//       // Select the username elements in the DOM
//       const usernameElements = document.querySelectorAll('.follow__headerText h3');

//       // Iterate through the list of users and update the username in each element
//       data.forEach((user, index) => {
//         if (usernameElements[index]) {
//             usernameElements[index].innerHTML = data[index];
//         }


//               //DYNAMIC
//       // Select the parent element where you want to append the username containers
//       const userListContainer = document.querySelector('.suggest-users-container');

//       // Iterate through the list of usernames and create a div container for each user
//       data.forEach((username) => {
//           // Create a new div element for the username container
//           const usernameContainer = document.createElement('div');
//           usernameContainer.classList.add('suggest-usernames');

//           // Set the inner HTML of the username container to the username
//           usernameContainer.innerHTML = username;

//           // Append the username container to the user list container
//           userListContainer.appendChild(usernameContainer);
          
//           // Add event listener to each username element
//           usernameContainer.addEventListener('click', () => {
//               // Navigate to profile page with username as query parameter
//               window.location.href = `profile.html?username=${encodeURIComponent(username)}`;
//       });
//       console.log(data);
//   })
//   .catch((error) => {
//       console.error("Error fetching from API:", error);
//   });
// });