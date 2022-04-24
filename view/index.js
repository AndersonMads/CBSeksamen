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
            <th>Product name</th>
            <th>Price</th>
            <th>Days since created</th>
            <th>Category</th>
            <th>Reusables</th>
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
                var showSelectedProducts = '<ul>'

                response.forEach(function(item) {
                    if(category === "all") {
                        list.innerHTML += `
                        <tr>
                            <td>${item.i_name}</td> 
                            <td>${item.price}</td>       
                            <td>${item.differ}</td>
                            <td>${item.c_name}</td>
                            <td>${item.reusables}</td>
                            <td>${item.username}</td>
                            <td>${item.gold}</td> 
                            <td>${item.follow}</td>                            
                        </tr>
                        `;
                    } else if (item.c_name === c_name) {
                        list.innerHTML += `
                        <tr>
                            <td>${item.i_name}</td> 
                            <td>${item.price}</td>       
                            <td>${item.differ}</td>
                            <td>${item.c_name}</td>
                            <td>${item.reusables}</td>
                            <td>${item.username}</td>
                            <td>${item.gold}</td> 
                            <td>${item.follow}</td>                    
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