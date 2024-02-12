/**HEART BUTTON TRANSITION FUNCTION**/
function toggleLike(button) {
  button.classList.toggle("liked");
}

/**API FOR LIKE BUTTON**/

// const API_ENDPOINTS = {
//   USER_TWEETS: "http://localhost:3000/api/docs/#/Posts/get_api_v1_posts",
//   LIKE_TWEETS: "http://localhost:3000/api/docs/#/Posts/patch_api_v1_posts__id",
//   USERNAME: "http://localhost:3000/api/docs/#/Users/get_api_v1_users_",
// };

// FUNCTION TO RETRIVE/GET USER'S TWEETS/POSTS

async function getTweets() {
  let token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/v1/posts", {
    headers: {
      "Content Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((user) => {
        const posts = user.content;
        console.log(posts);

        var postDiv = document.createElement("div");
        postDiv.className = "post";
        var username = "Cosmos";

        postDiv.innerHTML =
          '<p class="shux">' +
          username +
          '</p><p class="tweet-text">' +
          posts +
          "/</p>";

        document.querySelector(".twatter-profile-feed").appendChild(postDiv);
      });
    })
    .catch((error) => console.log(error));
}

// USER BUTTON IN NAV BAR - FUNCTION TO FETCH USERNAME

async function fetchUsernames() {
  try {
    const userNameResponse = await fetch(
      "http://localhost:3000/api/docs/#/Users/get_api_v1_users_"
    );
    if (!userNameResponse.ok) {
      throw new Error("Failed to fetch usernames");
    }
    const data = await userNameResponse.json();
    return data.usernames;
  } catch (error) {
    console.error("Error fetching usernames:", error.message);
    return null;
  }
}

async function displayLoggedInUsername() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    const usernames = await fetchUsernames();
    if (usernames) {
      const loggedInUser = username.find((user) => user.token === token);
      if (loggedInUser) {
        const profileNav = document.querySelector(".home-nav-btn.profile-nav");
        if (profileNav) {
          profileNav.innerHTML = `
          <button class="nav-btn">
            <div class="follow__avatar">
              <span class="material-symbols-outlined prof-nav-icon">account_circle</span>
            </div>
            <div>
              <span><h4 id="prof-btn-title">${loggedInUser.username}</h4></span>
            </div>
          </button>
        `;
        }
      } else {
        console.error("Logged-in user not found in the list of usernames");
      }
    } else {
      console.error("Failed to fetch usernames");
    }
  } catch (error) {
    console.error("Error displaying logged-in user's username:", error.message);
  }
}

window.onload = function () {
  displayLoggedInUsername();
};

// async function getTweets(user, token) {
//   let token = localStorage.getItem("token");

//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/v1/posts?user=${encodeURIComponent(user)}",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch tweets");
//     }

//     const data = await response.json();

//     data.forEach((tweet) => {
//       const tweetElement = document.createElement("div");
//       tweetElement.classList.add("twatter-profile-tweet");
//       tweetElement.innerHTML = `
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
