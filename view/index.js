document.addEventListener('DOMContentLoaded', function() {
    // Gør det muligt at logge ud ved at fjerne localstorage.
    let logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('user_id');
    });


    let submitCategory = document.getElementById('submitCategory');

    submitCategory.addEventListener('click', function () {
        const category = document.getElementById("category").value;

        //Indsætter tabelhovederne i html
        list.innerHTML = `
        <tr>
            <th>Username</th>
            <th>Product name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
        </tr>
        `;

        //Henter dataen fra item.json og indsætter i tabellen ved at loope igennem med forEach. 
        fetch("http://localhost:3000/items/showItems", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            if (response) {

            //Usorteret liste
                var showSelectedProducts = '<ul>'

                response.forEach(function(item) {
                    if(category === "all") {
                        list.innerHTML += `
                        <tr>
                            <td>${item.username}</td> 
                            <td>${item.productName}</td>       
                            <td>${item.price}</td>
                            <td>${item.category}</td>          
                            <td>${item.image}</td>             
                        </tr>
                        `;
                    } else if (item.category === category) {
                        list.innerHTML += `
                        <tr>
                            <td>${item.username}</td> 
                            <td>${item.productName}</td>       
                            <td>${item.price}</td>
                            <td>${item.category}</td>          
                            <td>${item.image}</td>             
                        </tr>
                        `;
                    };
                });
                
                document.getElementById("product").innerHTML = showSelectedProducts;
            };
        })
        .catch(() => {
            window.alert("You catched an error")
        });
    });
});