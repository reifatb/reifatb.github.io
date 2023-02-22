window.addEventListener('DOMContentLoaded', () => {
    'use strict'
    var div_usuarios = document.querySelector('#usuarios');
    // .Ofrece una API para acceder a recursos tipicos como usuarios, mensajes de un foro y fotos
    var usuarios = [];
    //fetch('https://jsonplaceholder.typicode.com/users')
    fetch('https://reqres.in/api/users')
        .then(data => data.json())
        .then(users => {
            usuarios = users.data;
            console.log(usuarios);
            //Crea un nuevo array con los resultadosde la función
            usuarios.map((user) => {
                let nombre = document.createElement("h2");
                nombre.innerHTML = user.first_name;
                div_usuarios.appendChild(nombre);

                const foto = document.createElement("img");
                foto.setAttribute("src", user.avatar);
                div_usuarios.appendChild(foto);
            });
        });
});