document.addEventListener("DOMContentLoaded", function () {
  // Gør det muligt med user_id på frontpage
  const h1 = document.querySelector("h1");
  const hideMe = document.getElementsByClassName("hideMe");

  // Gør det muligt at logge ud ved at fjerne localstorage.
  let logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", function () {
    localStorage.clear();
    location.href = "/";
  });

  //Med if-statement enten vises navigatører mellem endpoints samt bruger_id
  function navnPåForside() {
    if (localStorage.getItem("user_id")) {
      let user_id = localStorage.getItem("user_id");
      h1.textContent = "Velkommen. Dit user_id er " + user_id;
      registerButton.style.display = "none";
    } else {
      h1.textContent = "Velkommen, log ind eller registrer nedenfor";
      hideMe[0].style.display = "none";
      hideMe[1].style.display = "none";
      hideMe[2].style.display = "none";
      hideMe[3].style.display = "none";
      hideMe[4].style.display = "none";
      hideMe[5].style.display = "none";
      logoutButton.style.display = "none";
    }
  }

  let submitCategory = document.getElementById("submitCategory");

  submitCategory.addEventListener("click", function () {
    const category = document.getElementById("category").value;
    const date_created = document.getElementById("date").value;
    const pricemin = document.getElementById("pricemin").value;
    const pricemax = document.getElementById("pricemax").value;
    const reusables = document.getElementById("reusables").value;
    const location = document.getElementById("location").value;

    //Indsætter tabelhovederne i html
    list.innerHTML = `
        <tr>
            <th>Product name</th>
            <th>Price</th>
            <th>Created date</th>
            <th>Location</th>
            <th>Category</th>
            <th>For free?</th>
            <th>Username</th>
            <th>Gold</th>
            <th>Follow</th>
        </tr>
        `;

    //Henter dataen fra item.json og indsætter i tabellen ved at loope igennem med forEach.
    fetch("http://localhost:3000/showItems", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          //Usorteret liste
          var showSelectedProducts = "<ul>";

            //Usorteret liste
                var showSelectedProducts = '<ul>'

          //If-statement muliggør altid at filtrer på "for free?" samt evt filtre bruger ønsker
          response.forEach(function (item) {
            if (
              ((category === "all" && item.reusables == reusables) ||
                (category == item.c_name && item.reusables == reusables)) &&
              ((date_created == "" && item.reusables == reusables) ||
                (date_created == item.date_difference &&
                  item.reusables == reusables)) &&
              ((pricemin == "" && pricemax == "" && item.reusables == reusables) ||
                (pricemin < item.price && pricemax == "" && item.reusables == reusables) ||
                (pricemin == "" &&
                  pricemax > item.price &&
                  item.reusables == reusables) ||
                (pricemin < item.price &&
                  pricemax > item.price &&
                  item.reusables == reusables)) &&
              (reusables == 0 || reusables == item.reusables) &&
              ((location == "all" && item.reusables == reusables) ||
                (location == item.region && item.reusables == reusables))
            ){
              list.innerHTML += `
                        <tr>
                            <td>${item.i_name}</td> 
                            <td>${item.price}</td>       
                            <td>${new Date(item.date_created).toLocaleDateString()}</td>
                            <td>${item.region}</td>  
                            <td>${item.c_name}</td>
                            <td>${item.reusables}</td>
                            <td>${item.username}</td>
                            <td>${item.gold}</td>
                            <td>${item.follow}</td>  
                            <td><button type="submit" id="submitFollow">Follow</button></td>                            
                        </tr>
                        `;
            }
          });
          document.getElementById("product").innerHTML = showSelectedProducts;
        }
      }).catch((error) => {
        window.alert(error);
      });
  });
  document.body.onload = navnPåForside();
});
