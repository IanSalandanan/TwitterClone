
// TOKEN GLOBAL VARIABLE
var token = localStorage.getItem('token');

// FUNCTION FOR DISPLAYING CURRENT USER USERNAME --------------------------------------------------------------------------------------------------------------
function getUsernameFromLocalStorage() {
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username;
  }
  return null;
}

// LOGGED USERNAME GLOBAL VARIABLE
var logged_username = getUsernameFromLocalStorage();

function displayUsername(){
  if (logged_username) {
      console.log(`Username retrieved from localStorage: ${logged_username}`);
  } else {
      console.log("No username found in localStorage.");
  }

  const usernameElement = document.getElementById('nav-user');
  if (usernameElement !== null){
      usernameElement.innerHTML = `<h3>${logged_username}</h3>`; 
  }
}

// FUNCTION FOR CLEARING OUT TOKEN WHEN LOGGED-OUT ------------------------------------------------------------------------------------------------------------
function logOut() {
  window.location.href = "login.html";
  localStorage.removeItem("token");
}

// FUNCTION FOR GETTING USER POSTS ----------------------------------------------------------------------------------------------------------------------------
async function fetchPosts() {
  try {

    const requestUrl = 'http://localhost:3000/api/v1/posts';

    const requestMethod = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }

    const response = await fetch(requestUrl, requestMethod);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    const postMainContainer = document.querySelector('.post-main-container');

    posts.forEach(function (post) {
      const postContainer = document.createElement('div');
      postContainer.classList.add('post-container');

      const postAvatar = document.createElement('div');
      postAvatar.classList.add('post-avatar');
      postAvatar.innerHTML = '<span class="material-symbols-outlined"> account_circle </span>';
      postContainer.appendChild(postAvatar);

      const postBody = document.createElement('div');
      postBody.classList.add('post-body');

      const postHeader = document.createElement('div');
      postHeader.classList.add('post-header');

      const postHeaderText = document.createElement('div');
      postHeaderText.classList.add('post-header-text');
      postHeaderText.innerHTML = `<h3 class="post-username">${post.postedBy}</h3>`;
      postHeader.appendChild(postHeaderText);

      const postHeaderDescription = document.createElement('div');
      postHeaderDescription.classList.add('post-header-description');
      postHeaderDescription.innerHTML = `<p class="post-content">${post.content}</p>`;
      postHeader.appendChild(postHeaderDescription);

      postBody.appendChild(postHeader);

      const postFooter = document.createElement('div');
      postFooter.classList.add('post-footer');
      postFooter.innerHTML = '<span class="material-symbols-outlined" onclick="getLikes(event)"> favorite </span>';
      postBody.appendChild(postFooter);

      postContainer.appendChild(postBody);
      postMainContainer.appendChild(postContainer);
    });
  } catch (error) {
    console.error(`Error fetching likes: ${error}`);
  }
}

// CREATE POST FUNCTION ---------------------------------------------------------------------------------------------------------------------------------------
async function postTextAreaValueToAPI(event) {
  try {
    event.preventDefault();
  
    const textareaElement = document.getElementById("text-area");
    const textAreaValue = textareaElement.value;

    const requestUrl = 'http://localhost:3000/api/v1/posts'; 

    const requestMethod = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 'content': textAreaValue }),
    };

    const response = await fetch(requestUrl, requestMethod);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(`API response: ${data}`);

    window.location.reload();
  }
  catch (error) {
    console.error(`Error posting to API: ${error}`);
  }
}


// FUNCTION FOR GET AND PATCH LIKES ---------------------------------------------------------------------------------------------------------------------------
async function getLikes(event) {
  try {
    const postContainer = event.target.closest('.post-container');
    const content = postContainer.querySelector('.post-header-description p').textContent;
    const poster = postContainer.querySelector('.post-username').innerText;

    const requestUrl = 'http://localhost:3000/api/v1/posts';
    const requestMethod = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    }

    const response = await fetch(requestUrl, requestMethod);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const posts = await response.json();

    posts.forEach(post => {
      if(post.postedBy === poster && post.content === content){
        console.log(post.postId);
        patchLikeId(post.postId, token)
      }
    });
  }
  catch (error) {
    console.error(`Error fetching likes: ${error}`);
  }
}

async function patchLikeId(postId, token) {
  try {

    const requestUrl = `http://localhost:3000/api/v1/posts/${postId}`;
    const requestMethod = {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "like"
      })
    }

    await fetch(requestUrl, requestMethod);
    
  } catch (error) {
    console.error(`Error fetching likes: ${error}`);
  }
}


// FUNCTION TO GET HASHTAGS -----------------------------------------------------------------------------------------------------------------------------------
async function GetTrends() {
  try {
    const requestUrl = 'http://localhost:3000/api/v1/posts';

    const requestMethod = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    }

    const response = await fetch(requestUrl, requestMethod);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const posts = await response.json();
    const hashtagsCounts = {};

    posts.forEach(post => {

      const content = post.content;
      const words = content.split(' ');

      words.forEach(word => {
        if (word.startsWith('#')) {
          const hashtag = word; 

          if (hashtagsCounts.hasOwnProperty(hashtag)) {
            hashtagsCounts[hashtag]++;

          } else {
            hashtagsCounts[hashtag] = 1;
          }
        }
      });
    });

    const widgetsContainer = document.querySelector(".widgets-container");
    for (const hashtag in hashtagsCounts) {
      const count = hashtagsCounts[hashtag];
      const widgetText = document.createElement("div");
      widgetText.classList.add("widget-text");
      widgetText.innerHTML = `<p>${hashtag}   (${count})</p>`;
      widgetsContainer.appendChild(widgetText);
    }

  } catch (error) {
    console.error(`Error fetching likes: ${error}`);
  }
}


// EVENT LISTENERS FOR WHEN THE PAGE ELEMENTS HAS LOADED ------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  displayUsername();
  fetchPosts();
  GetTrends();
});