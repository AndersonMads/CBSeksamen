document.addEventListener("DOMContentLoaded", function () {
    let submitButton = document.getElementById("submit");
  
    submitButton.addEventListener("click", function (e) {
      // preventDefault sikrer at siden ikke opdatere imens form input oplyses
      e.preventDefault();
  
      let user_id = JSON.parse(localStorage.getItem("user_id"))

      if(!user_id) {
        return window.alert('Not logged in')
      } else {
        let adminUser = {
            admin_id : user_id
        }
    
        //Poster givne oplysninger
        fetch("http://localhost:3000/loginAdmin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(adminUser)
        }) 
          .then((response) => response.json())
          .then((response) => {
            if (response) {
              localStorage.setItem("admin", 'true');
              location.href = "/admin_index.html";
            } else {
              window.alert("No access");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    });
  });
  