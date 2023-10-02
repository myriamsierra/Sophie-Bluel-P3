
//////////////////////////////////PAGE DE CONNEXION///////////////////////////////////////////////////////////
const loginForm = document.querySelector('.login-form');


loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); 
    //on recupere les données ecrite dans nos champs de saisie
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const data = { email: email, password: password};
    //on va chercher nos données de notre api
     fetch('http://localhost:5678/api/users/login',{
     method: 'POST',
     headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
    })
    
    //ensuite avec ses données
    .then(response => response.json())
    .then(responseData => {
        if (responseData && responseData.token) {
            localStorage.setItem('token', responseData.token);  
            window.location.href = 'index.html';      
        } else {
            alert('L\'authentification a échoué. Vérifiez votre e-mail et votre mot de passe.');
        }
    })
})


