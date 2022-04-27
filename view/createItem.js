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

            let newItem = {
                user_id: localStorage.user_id,
                price: priceInput,
                itemName: itemNameInput,
                category: categoryInput,
                reusables: reusablesInput
            }
            
            //Poster givne oplysninger
            fetch('http://localhost:3000/newItemCreated', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            }).then(response => response.json())
            .then(response => {
                window.alert('Item created');
                location.href = "/";     
            })
            .catch((error) => {
                console.log('Error:', error)
            })
        });
});