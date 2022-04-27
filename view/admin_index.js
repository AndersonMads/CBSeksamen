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

  let submitCategory = document.getElementById('submitCategory');

  submitCategory.addEventListener('click', function () {

      //Indsætter tabelhovederne i html
      list.innerHTML = `
      <tr>
          <th>User_id</th>
          <th>Username</th>
          <th>Number of ads</th>
      </tr>
      `;

      //Henter dataen fra item.json og indsætter i tabellen ved at loope igennem med forEach. 
      fetch("http://localhost:3000/showListofUsers", {
          method: "GET",
      })
      .then((response) => response.json())
      .then((response) => {
          if (response) {
          //Usorteret liste
              var showSelectedUsers = '<ul>'

              //Ingen filtre (uden genbrugsvare)
              response.forEach(function(user) {
                  list.innerHTML += `
                  <tr>
                      <td>${user.user_id}</td> 
                      <td>${user.username}</td> 
                      <td>${user.number_of_ads}</td>                              
                  </tr>
                  `;
              });
              document.getElementById("users").innerHTML = showSelectedUsers;
          };
      })
      .catch((error) => {
          window.alert(error)
      });
  });


  //Slet bruger
  let submitButtonDelete = document.getElementById('submitDelete');

  submitButtonDelete.addEventListener('click', function(e) {
      // preventDefault sikrer at siden ikke opdatere imens form input oplyses
      e.preventDefault();

      let user_idInput = document.getElementById('user_id').value;

      let deleteUser = {
          user_id: user_idInput
      }
      
      //Poster givne oplysninger
      fetch('http://localhost:3000/deleteUserAdmin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(deleteUser)
      })
      .then(response => {
          window.alert('User deleted');
          location.href = "/admin_index.html";   
      })
      .catch((error) => {
          console.log('Error:', error)
      })
  });

    //Opdater bruger
    let submitButtonUpdate = document.getElementById('submitUpdate');

    submitButtonUpdate.addEventListener('click', function(e) {
        // preventDefault sikrer at siden ikke opdatere imens form input oplyses
        e.preventDefault();
  
        let user_idInput = document.getElementById('user_idUpdate').value;
        let usernameInput = document.getElementById('username').value;
        let passwordInput = document.getElementById('password').value;
        let goldInput = JSON.parse(document.getElementById('gold').value);
  
        let updateUser = {
            user_id: user_idInput,
            newUsername: usernameInput,
            newPassword: passwordInput,
            gold: goldInput
        }
        
        //Poster givne oplysninger
        fetch('http://localhost:3000/updateUserAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
        .then(response => {
            window.alert('User updated');
            location.href = "/admin_index.html";   
        })
        .catch((error) => {
            console.log('Error:', error)
        })
    });

});
