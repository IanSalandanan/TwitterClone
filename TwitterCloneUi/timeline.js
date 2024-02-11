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

const token = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/posts',{
  method :'GET',
  headers: {
    "Authorization": `Bearer ${token}`,
    "Accept":"application/json"
  }
}).then(function (response){
  return response.json();
}).then(function (obj) {
  console.log(obj);
});

