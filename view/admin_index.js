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
              var showSelectedProducts = '<ul>'

              //Ingen filtre (uden genbrugsvare)
              response.forEach(function(user) {
                  list.innerHTML += `
                  <tr>
                      <td>${user.id}</td> 
                      <td>${user.number_of_ads}</td>                              
                  </tr>
                  `;
              });
              document.getElementById("product").innerHTML = showSelectedProducts;
          };
      })
      .catch((error) => {
          window.alert(error)
      });
  });
});
