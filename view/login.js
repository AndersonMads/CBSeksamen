document.addEventListener("DOMContentLoaded", function () {
  const loggedIn = localStorage.getItem("user_id")
  if(loggedIn) {
    location.href = "/";
  }

  let submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", function (e) {
    // preventDefault sikrer at siden ikke opdatere imens form input oplyses
    e.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    //Laver om til objekt
    let loginUser = {
      username: usernameInput,
      password: passwordInput,
    };

    //Poster givne oplysninger og indsætter bruger_id i localstorage
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("user_id", data);
          location.href = "/";
        } else {
          window.alert("Username or password incorrect");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});