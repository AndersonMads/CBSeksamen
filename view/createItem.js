document.addEventListener('DOMContentLoaded',function () {

    let submitButton = document.getElementById('submit');

        submitButton.addEventListener('click', function(e) {
            // preventDefault sikrer at siden ikke opdatere imens form input oplyses
            e.preventDefault();

            let priceInput = document.getElementById('price').value;
            let itemNameInput = document.getElementById('i_name').value;
            let categoryInput = document.getElementById('category_id').value;
            let reusablesInput = document.getElementById('reusables').value;

            let newItem = {
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
            })
            .catch((error) => {
                console.log('Error:', error)
            })
        });
});