/**HEART BUTTON TRANSITION FUNCTION**/
function toggleLike(button) {
  button.classList.toggle("liked");
}

// async function getTweets() {
//   const token = localStorage.getItem("token");

//   const response = await fetch("http://localhost:3000/api/v1/posts", {
//     method: "GET",
//     headers: {
//       "Content Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       data.forEach((user) => {
//         const posts = user.content;
//         console.log(posts);

//         var postDiv = document.createElement("div");
//         postDiv.className = "post";
//         var username = "Cosmos";

//         postDiv.innerHTML =
//           '<p class="shux">' +
//           username +
//           '</p><p class="tweet-text">' +
//           posts +
//           "/</p>";

//         document.querySelector(".twatter-profile-feed").appendChild(postDiv);
//       });
//     })
//     .catch((error) => console.log(error));
// }

// // USER BUTTON IN NAV BAR - FUNCTION TO FETCH USERNAME

// function fetchUsernames() {
//   try {
//     const userNameResponse = fetch("http://localhost:3000/api/v1/users");
//     if (!userNameResponse.ok) {
//       throw new Error("Failed to fetch usernames");
//     }
//     const data = userNameResponse.json();
//     return data.usernames;
//   } catch (error) {
//     console.error("Error fetching usernames:", error.message);
//     return null;
//   }
// }

// function displayLoggedInUsername() {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("Token not found in local storage");
//       return;
//     }

//     const usernames = fetchUsernames();
//     if (usernames) {
//       const loggedInUser = usernames.find((user) => user.token === token);
//       if (loggedInUser) {
//         const profileNav = document.querySelector(".home-nav-btn.profile-nav");
//         if (profileNav) {
//           profileNav.innerHTML = `
//           <button class="nav-btn">
//             <div class="follow__avatar">
//               <span class="material-symbols-outlined prof-nav-icon">account_circle</span>
//             </div>
//             <div>
//               <span><h4 id="prof-btn-title">${loggedInUser.username}</h4></span>
//             </div>
//           </button>
//         `;
//         }
//       } else {
//         console.error("Logged-in user not found in the list of usernames");
//       }
//     } else {
//       console.error("Failed to fetch usernames");
//     }
//   } catch (error) {
//     console.error("Error displaying logged-in user's username:", error.message);
//   }
// }

// window.onload = function () {
//   displayLoggedInUsername();
// };

// `
//       <div class="follow__avatar">
//         <span class="tweet-prof-avatar material-symbols-outlined">account_circle</span>
//       </div>
//       <div class="tweet-content">
//         <div class="tweet-content-details">
//           <h4 class="tweet-name tweet-profile-name">${tweet.profileName}</h4>
//           <div class="publication-details">
//             <p class="shux">@${tweet.username}</p>
//             <p class="publication-pub-date">${tweet.date}</p>
//           </div>
//           <div class="twatter-heart-container">
//             <button class="heart-button" onclick="toggleLike(this)">
//               <span class="material-symbols-outlined"> favorite </span>
//               <span class="like-count-text">${tweet.likes} Likes</span>
//             </button>
//           </div>
//         </div>
//         <div class="tweet-content-container">
//           <p class="tweet-text">${tweet.content}</p>
//         </div>
//       </div>
//     `;
//       document.querySelector(".twatter-profile-feed").appendChild(tweetElement);
//     });
//   } catch (error) {
//     console.error("Error fetching tweets:", error);
//   }
// }

// Function to parse URL query parameters
/*
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
async function unFollow(classID, structNum) {
  z = document.querySelector("." + classID).textContent;
  if (z == "Follow") {
    document.querySelector("." + classID).textContent = "Following";
  } else {
    document.querySelector("." + classID).textContent = "Follow";
  }
}
*/
// async function unFollow(classID,structNum){
//   z = document.querySelector('.'+classID).textContent;
//   if (z == 'Follow') {
//       document.querySelector('.'+classID).textContent = 'Following';
//   } else {
//     followButton.textContent = 'Follow';
//     // Implement unfollow functionality if needed
//   }
// }


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


function logOut(event) {
  window.location.href = "login.html";
  localStorage.clear();
}
