document.addEventListener("DOMContentLoaded", function () {
  //Sikrer bruger er logget ind
  const loggedIn = localStorage.getItem("user_id");
  if (!loggedIn) {
    location.href = "/login.html";
    window.alert("Not logged in");
  }

  let submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", function (e) {
    // preventDefault sikrer at siden ikke opdatere imens form input oplyses
    e.preventDefault();

    let user_idInput = document.getElementById("user_id").value;

    //Laver om til objekt
    let deletedUser = {
      user_id: user_idInput,
    };
    if (user_idInput === localStorage.getItem("user_id")) {
      // Gør at man ikke kan slette andres bruger, men kun den man er logget ind på
      //Poster givne oplysninger
      fetch("http://localhost:3000/deleteOwnUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletedUser),
      })
        .then((response) => response.json())
        .then((response) => {
          localStorage.clear();
          window.alert("User deleted");
          location.href = "/index.html";
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      window.alert("You can only delete your own user");
    }
  });
});
