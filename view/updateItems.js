document.addEventListener('DOMContentLoaded',function () {
    const loggedIn = localStorage.getItem("user_id");
    if (!loggedIn) { 
        location.href = "/login.html";
         window.alert('Not logged in');
    }

    let submitButton = document.getElementById('submit');

        submitButton.addEventListener('click', function(e) {
            // preventDefault sikrer at siden ikke opdatere imens form input oplyses
            e.preventDefault();

           let priceInput = document.getElementById('price').value;
            let itemNameInput = document.getElementById('i_name').value;
           let categoryInput = document.getElementById('category_id').value;
           let reusablesInput = document.getElementById('reusables').value;
            let itemId = document.getElementById('id').value;

            let newItem = {
                itemName: itemNameInput,
                id: itemId,
                price: priceInput,
                category: categoryInput,
                reusable: reusablesInput
            }
            
            //Poster givne oplysninger
            fetch('http://localhost:3000/updateOwnItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            }).then(response => response.json())
            .then(() => {
                window.alert('Item updated'); 
                location.href = "/myItems.html";  
            })
            .catch((error) => {
                console.log('Error:', error)
            })
        });
});