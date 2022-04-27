document.addEventListener('DOMContentLoaded',function () {

    let submitButton = document.getElementById('submit');

        submitButton.addEventListener('click', function(e) {
            // preventDefault sikrer at siden ikke opdatere imens form input oplyses
            e.preventDefault();
           
            let user_idInput = document.getElementById('user_id').value;
            
            let newUser = {
                user_id: user_idInput,
            }
            if(user_idInput === localStorage.getItem("user_id")){ // Gør at man ikke kan slette andres bruger, men kun den man er logget ind på
            //Poster givne oplysninger
            fetch('http://localhost:3000/deleteOwnUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }).then(response => response.json())
            .then(response => {
                localStorage.clear()
                window.alert('User deleted');
                location.href = "/index.html";     
            })
            .catch((error) => {
                console.log('Error:', error)
            })
                }
        });
});