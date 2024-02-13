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
  const usernameElement = document.getElementById('nav-user');
  if (usernameElement !== null){
      usernameElement.innerHTML = `<h3>${logged_username}</h3>`; 
  }
}

document.addEventListener("DOMContentLoaded", function() {
  displayUsername();
});


function postTextAreaValueToAPI(event) {
    event.preventDefault();
    
    const textareaElement = document.getElementById("text-area");
    const textAreaValue = textareaElement.value;
  
    const apiUrl = "http://localhost:3000/api/v1/posts"; 
    const token = localStorage.getItem('token');
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({ "content": textAreaValue }),
    };
  
    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error("Error posting to API:", error);
      });
}

function logOut(event) {
  window.location.href = "login.html";
  localStorage.clear();
}

const token = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/posts',{
  method :'GET',
  headers: {
    "Authorization": `Bearer ${token}`,
    "Accept":"application/json"
  }
}).then(function (response){
  return response.json();
}).then(function (posts) {
  // Assuming 'posts' is an array of post objects received from the API
  const postMainContainer = document.querySelector('.post-main-container');

  posts.forEach(function(post) {
    // Create the post container div
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');

    // Create the post avatar div and add it to the post container
    const postAvatar = document.createElement('div');
    postAvatar.classList.add('post-avatar');
    postAvatar.innerHTML = '<span class="material-symbols-outlined"> account_circle </span>';
    postContainer.appendChild(postAvatar);

    // Create the post body div and add it to the post container
    const postBody = document.createElement('div');
    postBody.classList.add('post-body');

    // Create the post header div and add it to the post body
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    // Create the post header text div and add it to the post header
    const postHeaderText = document.createElement('div');
    postHeaderText.classList.add('post-header-text');
    postHeaderText.innerHTML = `<h3>${logged_username}</h3>`; // Assuming 'username' is a property of the post object
    postHeader.appendChild(postHeaderText);

    // Create the post header description div and add it to the post header
    const postHeaderDescription = document.createElement('div');
    postHeaderDescription.classList.add('post-header-description');
    postHeaderDescription.innerHTML = `<p>${post.content}</p>`; // Assuming 'content' is a property of the post object
    postHeader.appendChild(postHeaderDescription);

    // Add the post header to the post body
    postBody.appendChild(postHeader);

    // Create the post footer div and add it to the post body
    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer');
    postFooter.innerHTML = '<span class="material-symbols-outlined"> favorite </span>';
    postBody.appendChild(postFooter);

    // Add the post body to the post container
    postContainer.appendChild(postBody);

    // Add the post container to the post main container
    postMainContainer.appendChild(postContainer);
  });
});
