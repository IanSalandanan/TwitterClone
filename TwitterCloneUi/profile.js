/**HEART BUTTON TRANSITION FUNCTION**/
function toggleLike(button) {
  button.classList.toggle("liked");
}

/**API FOR LIKE BUTTON**/



// Function to parse URL query parameters
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the username from the URL query parameter
    const username = getQueryParam('username');

    // Select the element to display the username
    const usernameElement = document.getElementById('profile-name');

    // Set the inner HTML of the element with the username
    usernameElement.innerHTML = `<span>${username}</span>`;
});
