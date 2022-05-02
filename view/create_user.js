document.addEventListener("DOMContentLoaded", function () {
  let submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", function (e) {
    // preventDefault sikrer at siden ikke opdatere imens form input oplyses
    e.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;
    let regionInput = document.getElementById("region").value;

    //Laver om til objekt
    let newUser = {
      username: usernameInput,
      password: passwordInput,
      region: regionInput,
    };

    //Poster givne oplysninger
    fetch("http://localhost:3000/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((response) => {
        window.alert("User created");
        location.href = "/login.html";
      })
      .catch((error) => {
        window.alert("Username already in use");
      });
  });
});
