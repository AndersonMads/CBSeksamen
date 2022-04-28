document.addEventListener('DOMContentLoaded', function() {
    const h1 = document.querySelector('h1') // Gør det muligt med user_id på frontpage
    const hideMe = document.getElementsByClassName('hideMe')
 
    // Gør det muligt at logge ud ved at fjerne localstorage.
    let logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        location.href = "/";
    });
    

    function navnPåForside() {
        if(localStorage.getItem('user_id')){
            let user_id = localStorage.getItem('user_id');
            h1.textContent = 'Velkommen. Dit user_id er ' + user_id;
            registerButton.style.display = 'none'
            } else {
                h1.textContent = 'Velkommen, log ind eller registrer nedenfor';
                hideMe[0].style.display = 'none'
                hideMe[1].style.display = 'none'
                hideMe[2].style.display = 'none'
                hideMe[3].style.display = 'none'
                hideMe[4].style.display = 'none'
                hideMe[5].style.display = 'none'
                logoutButton.style.display = 'none'

            }
        };

    let submitCategory = document.getElementById('submitCategory');

    submitCategory.addEventListener('click', function () {
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
                var showSelectedProducts = '<ul>'

                //Ingen filtre (uden genbrugsvare)
                response.forEach(function(item) {
                    if((category === "all" || category==item.c_name)
                     && (date_created == "" || date_created==item.date_created)
                      && ((pricemin == "" && pricemax == "") || (pricemin < item.price && pricemax == "") || (pricemin == "" && pricemax > item.price) || (pricemin < item.price && pricemax > item.price))
                       && (reusables==0 || reusables ==item.reusables)
                        && (location =="all" || location==item.region)) {
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
    document.body.onload = navnPåForside()
});
