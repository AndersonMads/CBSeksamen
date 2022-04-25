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
                        </tr>
                        `;
                    }
                });
                document.getElementById("product").innerHTML = showSelectedProducts;
            };
        })
        .catch((error) => {
            window.alert(error)
        });
    });

});

