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
  else{
    return null;
  }
  
}

var logged_username = getUsernameFromLocalStorage();

function displayUsername() {
  if (logged_username) {
    console.log("Logged in username (localStorage):", logged_username);
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


// Function to parse URL query parameters (to get username to follow)
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the username from the URL query parameter
  const username = getQueryParam("username");
  const usernameElement = document.getElementById("profile-username");
  usernameElement.innerHTML = `<span>${logged_username}</span>`;
});

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

//follow button to following
async function followUser(usernameToFollow) {
  const token = localStorage.getItem("token");

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

//following button to follow
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

//FOLLOW OR UNFOLLOW MECHANISM

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
