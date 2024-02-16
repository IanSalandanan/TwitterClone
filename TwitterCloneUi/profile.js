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

function displayFollowBtn() {
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
  const followStatus = localStorage.setItem(
    `loggedUser_${logged_username} followStatus_${username}`,
    status
  );
}

function getFollowStatusFromLocalStorage(username) {
  return localStorage.getItem(
    `loggedUser_${logged_username} followStatus_${username}`
  );
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

function followUnfollow_initial() {
  const followButton = document.querySelector(".follow-btn-1");
  const username = getQueryParam("username");
  const initialStatus = getFollowStatusFromLocalStorage(username);

  if (initialStatus === "followed") {
    followButton.textContent = "Following";
  } else {
    followButton.textContent = "Follow";
  }
}

function refreshProfilePage() {
  window.location.reload(true); // Reloads the page from the server, ignoring the cache
}

//FUNCTION FOR GETTING USER POSTS
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const loggedInUsername = localStorage.getItem("username"); // Retrieve the logged-in username
  const urlParams = new URLSearchParams(window.location.search);
  const suggestedUsername = urlParams.get("username"); // Retrieve the suggested username from the URL query parameters

  const tweetContainer = document.querySelector(".twatter-profile-feed");

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
      const followed_userListContainer = document.querySelector(
        ".twatter-profile-feed"
      );

      posts.forEach(function (post) {
        if (suggestedUsername && post.postedBy === suggestedUsername) {
          const tweetDiv = createTweetElement(post);
          tweetContainer.appendChild(tweetDiv);
        } else if (!suggestedUsername && post.postedBy === logged_username) {
          const tweetDiv = createTweetElement(post);
          tweetContainer.appendChild(tweetDiv);
        }
      });

      if (!tweetContainer.children.length) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("twatter-profile-feedContainerEmpty");
        messageElement.textContent = "Follow this user to see their posts";
        tweetContainer.appendChild(messageElement);
      }
    })
    .catch(function (error) {
      console.error("Error fetching posts:", error);
    });

  function createTweetElement(post) {
    const tweetDiv = document.createElement("div");
    tweetDiv.classList.add("twatter-profile-tweet");

    // const avatarDiv = document.createElement("div");
    // avatarDiv.classList.add("follow__avatar");
    // avatarDiv.innerHTML =
    //   '<span class="tweet-prof-avatar material-symbols-outlined">account_circle</span>';
    // tweetDiv.appendChild(avatarDiv);

    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("follow__avatar");

    const imgElement = document.createElement("img");
    imgElement.src = "./assets/catdp1.avif";
    imgElement.alt = "Profile Icon";
    imgElement.classList.add("profile-feed-icon", "profile-feed-icon-2");

    avatarDiv.appendChild(imgElement);
    tweetDiv.appendChild(avatarDiv);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("tweet-content");

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("tweet-content-details");
    detailsDiv.innerHTML = `<h4 class="tweet-name tweet-profile-name">${post.postedBy}</h4>`;
    contentDiv.appendChild(detailsDiv);

    const textDiv = document.createElement("div");
    textDiv.classList.add("tweet-content-container");
    textDiv.innerHTML = `<p class="tweet-text">${post.content}</p>`;
    contentDiv.appendChild(textDiv);

    const heartDiv = document.createElement("div");
    heartDiv.classList.add("twatter-heart-container");
    heartDiv.innerHTML = `<button class="heart-button" onclick="toggleLike(this)">
                            <span class="material-symbols-outlined"> favorite </span>
                          </button>`;
    contentDiv.appendChild(heartDiv);

    tweetDiv.appendChild(contentDiv);

    return tweetDiv;
  }
});

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
});

document.addEventListener("DOMContentLoaded", fetchProfilePost());

function logOut(event) {
  window.location.href = "login.html";
  localStorage.removeItem("token");
}

async function getLikes(event) {
  try {
    const postContainer = event.target.closest(".twatter-profile-tweet");
    const content = postContainer.querySelector(".tweet-text").textContent;
    const poster = postContainer.querySelector(".tweet-profile-name").innerText;

    const token = localStorage.getItem("token"); // Get the token from localStorage

    const requestUrl = "http://localhost:3000/api/v1/posts";
    const requestMethod = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    const response = await fetch(requestUrl, requestMethod);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const posts = await response.json();

    posts.forEach((post) => {
      if (post.postedBy === poster && post.content === content) {
        console.log(post.postId);
        patchLikeId(post.postId, token);
      }
    });
  } catch (error) {
    console.error(`Error fetching likes: ${error}`);
  }
}

async function patchLikeId(postId, token) {
  try {
    const requestUrl = `http://localhost:3000/api/v1/posts/${postId}`;
    const requestMethod = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "like",
      }),
    };

    await fetch(requestUrl, requestMethod);
  } catch (error) {
    console.error(`Error fetching likes: ${error}`);
  }
}

async function toggleLike(button) {
  try {
    // Check if the button is already liked
    const isLiked = button.dataset.liked === "true";

    if (isLiked) {
      // Unlike the post
      // Code to remove like data goes here
      button.style.color = ""; // Reset the color to default
      button.dataset.liked = "false"; // Update the dataset to reflect unliking
    } else {
      // Like the post
      await getLikes(event);
      button.style.color = "red"; // Change the color to indicate liking
      button.dataset.liked = "true"; // Update the dataset to reflect liking
    }
  } catch (error) {
    console.error(`Error toggling like: ${error}`);
  }
}
