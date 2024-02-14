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
  const followButton = document.querySelector("." + classID);
  const username = getQueryParam("username"); // Get username from URL query parameter

  if (followButton.textContent === "Follow") {
    followButton.textContent = "Following";
    followUser(username);
  } else {
    document.querySelector("." + classID).textContent = "Follow";
  }

  //display username of logged user
  const usernameElement = document.getElementById("nav-profile-username");
  if (usernameElement !== null) {
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
  usernameElement.innerHTML = `<span>${logged_username}</span>`;
});

async function unFollow(classID) {
  const followButton = document.querySelector("." + classID);
  const username = getQueryParam("username"); // Get username from URL query parameter

  z = document.querySelector("." + classID).textContent;
  if (z == "Follow") {
    document.querySelector("." + classID).textContent = "Following";
    followUser(username);
  } else {
    document.querySelector("." + classID).textContent = "Follow";
  }
}

async function followUser(usernameToFollow) {
  const token = localStorage.getItem("token");
  //const loggedUsername = localStorage.getItem('logged_username');

  const res = await fetch(
    `http://localhost:3000/api/v1/users/${logged_username}/following/${usernameToFollow}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ usernameToFollow }),
    }
  );

  try {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    } else {
      console.log(`Followed: ${usernameToFollow}`);
      const status = "followed";
      return status;
    }
  } catch (error) {
    console.error(error);
  }
}

// connected siya kay following - para ma-change yung profile name at username kay suggested user

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let username = urlParams.get("username");

  if (!username) {
    username = logged_username;
  }

  const profileUsernameElement = document.getElementById("profile-username");
  profileUsernameElement.textContent = username;
});

// ito yung pagtanggal kay follow button kapag nasa profile ni logged in user

document.addEventListener("DOMContentLoaded", function () {
  // Read the username from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  // Check if the username matches the username of the currently logged-in user
  if (username && username !== logged_username) {
    const followButtonContainer = document.querySelector(".user-tab-4");
    const followButton = document.createElement("button");
    followButton.className = "follow-btn-1";
    followButton.type = "button";
    followButton.textContent = "Follow";
    followButton.onclick = function () {
      followUnfollow("follow-btn-1");
    };
    followButtonContainer.appendChild(followButton);
  }
});

// async function unfollowUser() {
//   const token = localStorage.getItem("token");
//   const rawData = document.getElementById("username");
//   const userToUnfollow = rawData.value;
async function unfollowUser(usernameToUnfollow) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:3000/api/v1/users/${logged_username}/following/${usernameToUnfollow}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  try {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    } else {
      console.log(`Unfollowed: ${usernameToUnfollow}`);
      const status = "unfollowed";
      return status;
    }
  } catch (error) {
    console.error(error);
  }
}

// async function refreshFollowingList(username, classID) {
//   const token = localStorage.getItem('token');

//   const res = await fetch(`http://localhost:3000/api/v1/users/${logged_username}/following/${username}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   });

//   try {
//     if (res.ok) {
//       console.log("user is followed, so next imma change the button to following");
//       document.querySelector("." + classID).textContent = "Following";
//       }
//     else
//     {
//       console.log("user unfollowed, so button change to follow");
//       document.querySelector("." + classID).textContent = "Follow";
//       // throw new Error(`checkstatus: API request failed with status ${res.status}`);
//     }

//   } catch (error) {
//     console.error(error);
//   }
// }

// async function followUnfollow(classID) {
//   //preventDefault();
//   const followButton = document.querySelector('.' + classID);
//   const username = getQueryParam("username"); // Get username from URL query parameter

//   try {
//     if (followButton.textContent === 'Follow') {
//       console.log("Attempting to follow user...");
//       await followUser(username);
//       console.log("User followed successfully!");
//       followButton.textContent = 'Following';
//     } else {
//       console.log("Attempting to unfollow user...");
//       await unfollowUser(username);
//       console.log("User unfollowed successfully!");
//       followButton.textContent = 'Follow';
//     }

//     // Display username of logged user
//     const usernameElement = document.getElementById('nav-profile-username');
//     if (usernameElement !== null){
//       usernameElement.innerHTML = `<h3>${logged_username}</h3>`;
//     }

//     // Check if the user is already followed or not thru refreshing and then act accordingly
//     await refreshFollowingList(username, classID);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// Update follow/unfollow status in local storage
async function updateFollowStatusInLocalStorage(username, status) {
  localStorage.setItem(`followStatus_${username}`, status);
}

// Get follow/unfollow status from local storage
function getFollowStatusFromLocalStorage(username) {
  return localStorage.getItem(`followStatus_${username}`);
}

// Function to toggle follow/unfollow status
async function toggleFollowStatus(username) {
  const currentStatus = getFollowStatusFromLocalStorage(username);
  const newStatus = currentStatus === "followed" ? "unfollowed" : "followed";
  updateFollowStatusInLocalStorage(username, newStatus);
}

// Usage example:
async function followUnfollow(classID) {
  const followButton = document.querySelector("." + classID);
  const username = getQueryParam("username");

  // Toggle follow/unfollow status
  await toggleFollowStatus(username);

  // Update button text based on new status
  const newStatus = getFollowStatusFromLocalStorage(username);
  if (newStatus === "followed") {
    followButton.textContent = "Following";
    await followUser(username);
  } else {
    followButton.textContent = "Follow";
    await unfollowUser(username);
  }
}

// Update button text based on initial follow/unfollow status
document.addEventListener("DOMContentLoaded", async function () {
  const followButton = document.querySelector(".follow-btn-1");
  const username = getQueryParam("username");
  const initialStatus = getFollowStatusFromLocalStorage(username);

  if (initialStatus === "followed") {
    followButton.textContent = "Following";
  } else {
    followButton.textContent = "Follow";
  }
});

function logOut(event) {
  window.location.href = "login.html";
  localStorage.clear();
}
