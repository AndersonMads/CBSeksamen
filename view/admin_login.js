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

    //Henter localstorage.user_id
    let user_id = JSON.parse(localStorage.getItem("user_id"));

    //Sikrer at bruger er logget ind
    if (!user_id) {
      return window.alert("Not logged in");
    } else {
      let adminUser = {
        admin_id: user_id,
      };

      //Poster givne oplysninger og indsætter admin til localstorage
      fetch("http://localhost:3000/loginAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminUser),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            localStorage.setItem("admin", "true");
            location.href = "/admin_index.html";
          } else {
            window.alert("No access");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
