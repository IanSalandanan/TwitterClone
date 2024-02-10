document.getElementsByClassName("post-button").addEventListener("click", event => {
    event.preventDefault();

    const textAreaValue = document.getElementsByClassName("text-area").value;

    fetch('http://localhost:3000/api/v1/posts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: textAreaValue})
    })
    .then(response => response.json())
    .then(data => {
        console.log("API response: ", data)
    })
    .catch(error => {
        console.error("API error: ", error);
    });
})

