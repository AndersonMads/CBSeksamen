document.addEventListener('DOMContentLoaded',function () {

    let submitButton = document.getElementById('submit');

        submitButton.addEventListener('click', function(e) {
            // preventDefault sikrer at siden ikke opdatere imens form input oplyses
            e.preventDefault();

            
            let usernameInput = document.getElementById('username').value;
            let passwordInput = document.getElementById('password').value;

            // Genererer et unikt ID til bruger
            let newID = 'id' + Date.now().toString(36);

            let newUser = {
                userid: newID,
                username: usernameInput,
                password: passwordInput
            }
            
            //Poster givne oplysninger
            fetch('http://localhost:3000/users/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }).then(response => response.json())
            .then(response => {
                window.alert('User created');
                location.href = "/login.html";     
            })
            .catch((error) => {
                console.log('Error:', error)
            })
        });
});