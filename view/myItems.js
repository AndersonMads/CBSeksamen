document.addEventListener('DOMContentLoaded', function() {

    let submitCategory = document.getElementById('submitCategory');

    submitCategory.addEventListener('click', function () {

        //Indsætter tabelhovederne i html
        list.innerHTML = `
        <tr>
            <th>Product name</th>
            <th>Price</th>
            <th>Created date</th>
            <th>Category</th>
            <th>For free?</th>
            <th>Item ID</th>
        </tr>
        `;

        //Henter dataen fra item.json og indsætter i tabellen ved at loope igennem med forEach. 
        fetch("http://localhost:3000/showOwnItems", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            if (response) {

            //Usorteret liste
                var showSelectedProducts = '<ul>'

                //Ingen filtre (uden genbrugsvare)
                response.forEach(function(item) {
                    if(item.user_id == localStorage.getItem("user_id")) {
                        list.innerHTML += `
                        <tr>
                            <td>${item.i_name}</td> 
                            <td>${item.price}</td>       
                            <td>${new Date(item.date_created).toLocaleDateString()}</td>
                            <td>${item.c_name}</td>
                            <td>${item.reusables}</td>    
                            <td>${item.id[0]}</td>                      
                        </tr>
                        `;
            }
          });
          document.getElementById("product").innerHTML = showSelectedProducts;
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  });


  //Slet egne varer
  let submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", function (e) {
    // preventDefault sikrer at siden ikke opdatere imens form input oplyses
    e.preventDefault();

    let item_idInput = document.getElementById("item_id").value;

    let deletedItem = {
      item_id: item_idInput,
    };

    //Poster givne oplysninger
    fetch("http://localhost:3000/deleteOwnItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletedItem),
    })
      .then((response) => {
        window.alert("Item deleted");
        location.href = "/myItems.html";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });

  //Opdaterer egne varer
  let submitButtonUpdate = document.getElementById("submitUpdate");

  submitButtonUpdate.addEventListener("click", function (e) {
    // preventDefault sikrer at siden ikke opdatere imens form input oplyses
    e.preventDefault();

    let priceInput = document.getElementById("price").value;
    let itemNameInput = document.getElementById("i_name").value;
    let categoryInput = document.getElementById("category_id").value;
    let reusablesInput = document.getElementById("reusables").value;
    let item_idInput = document.getElementById("id").value;

    let newItem = {
      itemName: itemNameInput,
      item_id: item_idInput,
      price: priceInput,
      category_id: categoryInput,
      reusables: reusablesInput,
    };

    //Poster givne oplysninger
    fetch("http://localhost:3000/updateOwnItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then(() => {
        window.alert("Item updated");
        location.href = "/myItems.html";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});

