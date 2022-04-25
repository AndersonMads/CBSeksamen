document.addEventListener("DOMContentLoaded", function () {
  const localstorageAdmin = localStorage.admin;
  if (!localstorageAdmin) {
    location.href = "/";
    window.alert("Not access");
  }

  let logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    localStorage.clear();
    location.href = "/login";
  });

  // let submitButton = document.getElementById('submit');

  //     submitButton.addEventListener('click', function(e) {
  //         // preventDefault sikrer at siden ikke opdatere imens form input oplyses
  //         e.preventDefault();

  //         let usernameInput = document.getElementById('username').value;
  //         let passwordInput = document.getElementById('password').value;

  //         let loginUser = {
  //             username: usernameInput,
  //             password: passwordInput,
  //         }

  //         //Poster givne oplysninger
  //         fetch('http://localhost:3000/login', {
  //             method: 'GET',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify(loginUser)
  //         }).then(response => response.json())
  //         .then(response => {
  //             window.alert('User created');
  //             // location.href = "/login.html";
  //         })
  //         .catch((error) => {
  //             console.log('Error:', error)
  //         })
  //     });
});
