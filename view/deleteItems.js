document.addEventListener('DOMContentLoaded',function () {

    let submitButton = document.getElementById('submit');

        submitButton.addEventListener('click', function(e) {
            // preventDefault sikrer at siden ikke opdatere imens form input oplyses
            e.preventDefault();

            let usernameInput = document.getElementById('username').value;

            let deletedItem = {
                username: usernameInput,
            }
            
            //Poster givne oplysninger
            fetch('http://localhost:3000/deleteOwnItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deletedItem)
            })
            .then(response => {
                window.alert('Item deleted');
                location.href = "/myItems.html";     
            })
            .catch((error) => {
                console.log('Error:', error)
            })
        });
});