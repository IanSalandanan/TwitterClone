

// DISPLAY USERNAME IN NAV
function getUsernameFromLocalStorage() {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username;
  } else {
    return null;
  }
}

var logged_username = getUsernameFromLocalStorage();

function displayNavUsername() {
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

//DISPLAY USERNAME INSIDE THE TWEET
function displayTweetUsername() {
  const tweetUsernameElement = document.getElementById("user-tweet-username");
  if (tweetUsernameElement !== null) {
    tweetUsernameElement.innerText = `${logged_username}`;
  }
}

// Function to parse URL query parameters (to get username to follow and unfollow)
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}


// ito yung pagtanggal kay follow button kapag nasa profile ni logged in user

function displayFollowBtn(){
  // Read the username from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const URLusername = urlParams.get("username");

  // Check if the username matches the username of the currently logged-in user
  if (URLusername && URLusername !== logged_username) {
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
}


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

async function updateFollowStatusInLocalStorage(username, status) {
  const followStatus = localStorage.setItem(`loggedUser_${logged_username} followStatus_${username}`, status);
}

function getFollowStatusFromLocalStorage(username) {
  return localStorage.getItem(`loggedUser_${logged_username} followStatus_${username}`);
}

// Function to toggle follow/unfollow status
async function toggleFollowStatus(username) {
  const currentStatus = getFollowStatusFromLocalStorage(username);
  let newStatus;

  if (currentStatus === "followed") {
    newStatus = "unfollowed";
  } else {
    newStatus = "followed";
  }
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

function followUnfollow_initial(){
  const followButton = document.querySelector(".follow-btn-1");
  const username = getQueryParam("username");
  const initialStatus = getFollowStatusFromLocalStorage(username);

  if (initialStatus === "followed") {
    followButton.textContent = "Following";
  } else {
    followButton.textContent = "Follow";
  }
}



//FUNCTION FOR GETTING USER POSTS
async function fetchProfilePost(){
  const token = localStorage.getItem("token");
fetch("http://localhost:3000/api/v1/posts", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (posts) {
    // Assuming 'posts' is an array of post objects received from the API
    const tweetContainer = document.querySelector(".twatter-profile-feed");

    posts.forEach(function (post) {
      // Create the tweet container div
      const tweetDiv = document.createElement("div");
      tweetDiv.classList.add("twatter-profile-tweet");

      // Create the tweet avatar div and add it to the tweet container
      const avatarDiv = document.createElement("div");
      avatarDiv.classList.add("follow__avatar");
      avatarDiv.innerHTML =
        '<span class="tweet-prof-avatar material-symbols-outlined">account_circle</span>';
      tweetDiv.appendChild(avatarDiv);

      // Create the tweet content div and add it to the tweet container
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("tweet-content");

      // Create the tweet content details div and add it to the tweet content
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("tweet-content-details");
      detailsDiv.innerHTML = `<h4 class="tweet-name tweet-profile-name">${post.postedBy}</h4>`;
      contentDiv.appendChild(detailsDiv);

      // Create the tweet content container div and add it to the tweet content
      const textDiv = document.createElement("div");
      textDiv.classList.add("tweet-content-container");
      textDiv.innerHTML = `<p class="tweet-text">${post.content}</p>`;
      contentDiv.appendChild(textDiv);

      // Create the tweet heart container div and add it to the tweet content
      const heartDiv = document.createElement("div");
      heartDiv.classList.add("twatter-heart-container");
      heartDiv.innerHTML = `<button class="heart-button" onclick="toggleLike(this)">
                            <span class="material-symbols-outlined"> favorite </span>
                          </button>`;
      contentDiv.appendChild(heartDiv);

      // Add the tweet content to the tweet container
      tweetDiv.appendChild(contentDiv);

      // Add the tweet container to the tweet main container
      tweetContainer.appendChild(tweetDiv);
    });
  });
}

// connected siya kay following - para ma-change yung profile name at username kay suggested user & followed user
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let username = urlParams.get("username");

  if (!username) {
    username = logged_username;
  }
  const profileUsernameElement = document.getElementById("profile-username");
  profileUsernameElement.textContent = username;
});

function refreshProfilePage() {
  window.location.reload(true); // Reloads the page from the server, ignoring the cache
}

document.addEventListener("DOMContentLoaded", function () {
  
  displayNavUsername();
  displayTweetUsername();
  displayFollowBtn();
  followUnfollow_initial();
  fetchProfilePost();
  

});


function logOut(event) {
  window.location.href = "login.html";
  localStorage.removeItem("token");
}

