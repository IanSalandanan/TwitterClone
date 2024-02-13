/**HEART BUTTON TRANSITION FUNCTION**/
function toggleLike(button) {
  button.classList.toggle("liked");
}

// DISPLAY USERNAME IN NAV
function getUsernameFromLocalStorage() {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username;
  }
  return null;
}

var logged_username = getUsernameFromLocalStorage();

function displayUsername() {
  if (logged_username) {
    console.log("Username retrieved from localStorage:", logged_username);
  } else {
    console.log("No username found in localStorage.");
  }

  const usernameElement = document.getElementById("nav-profile-username");
  if (usernameElement !== null) {
    usernameElement.innerText = `${logged_username}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayUsername();
});


// Function to parse URL query parameters

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the username from the URL query parameter
  const username = getQueryParam("username");

  // Select the element to display the username
  const usernameElement = document.getElementById("profile-username");

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
    document.querySelector("." + classID).textContent = "Follow";
  }


  //display username of logged user
  const usernameElement = document.getElementById('nav-profile-username');
  if (usernameElement !== null){
      usernameElement.innerHTML = `<h3>${logged_username}</h3>`; 
  }
}



// Function to parse URL query parameters (to get username to follow)
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the username from the URL query parameter
  const username = getQueryParam("username");

  // Select the element to display the username
  const usernameElement = document.getElementById("profile-username");

  // Set the inner HTML of the element with the username
  usernameElement.innerHTML = `<span>${username}</span>`;
});


async function unFollow(classID){

  const followButton = document.querySelector('.' + classID);
  const username = getQueryParam("username"); // Get username from URL query parameter

  z = document.querySelector('.'+classID).textContent;
  if (z == 'Follow') {
      document.querySelector('.'+classID).textContent = 'Following';
      followUser(username);
  } else {
      document.querySelector('.'+classID).textContent = 'Follow';
  }
}

async function followUser(usernameToFollow) {
  const token = localStorage.getItem('token');
  //const loggedUsername = localStorage.getItem('logged_username');

  const res = await fetch(`http://localhost:3000/api/v1/users/${logged_username}/following/${usernameToFollow}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ usernameToFollow }),
    }
  );

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
//   const token = localStorage.getItem("token");
//   const rawData = document.getElementById("username");
//   const userToUnfollow = rawData.value;

//   const res = await fetch(
//     `http://localhost:3000/api/v1/users/${logged_username}/following/${userToUnfollow}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   try {
//     if (!res.ok) {
//       throw new Error(`API request failed with status ${res.status}`);
//     } else {
//       console.log(`Unfollowed: ${userToUnfollow}`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

function logOut(event) {
  window.location.href = "login.html";
  localStorage.clear();
}
