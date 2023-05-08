
async function getArrayPizzas() {
    try {
        const response = await fetch('datos.json');
        const json = await response.json();
        return json.members;
    } catch (error) {
        console.error(error);
    }
}

async function getArrayUsuarios() {
    try {
        const response = await fetch('users.json');
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error(error);
    }
}

function buscarPizza(id, pizzas) {
    for (let pizza of pizzas) {
        if (id === pizza.identificador) {
            return pizza;
        } else {
            return null;
        }
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const arrayPizzas = await getArrayPizzas();
    const arrayUsuarios = await getArrayUsuarios();
    const idPromt = prompt('Usuario');
    let idPromtParsed;

    //Comprobación
    if (idPromt) {
        idPromtParsed = parseInt(idPromt);
    } else {
        throw new Error('Debe introducir un ID')
    }

    for (let usuario of arrayUsuarios) {
        if (usuario.id === idPromtParsed) {
            const h2 = document.createElement('h2')
            h2.innerHTML = usuario.first_name + ' ' + usuario.last_name;
            document.body.appendChild(h2);

            const promise = new Promise((resolve, reject) => {
                if (buscarPizza(usuario.id, arrayPizzas)) {
                    resolve(buscarPizza(usuario.id, arrayPizzas));
                } else {

                    reject(console.error('ERROR'))
                }
            })

            promise.then(pizza => {
                for (let ingrediente of pizza.ingredientes) {
                    const p = document.createElement('p');
                    p.innerHTML = ingrediente;
                    document.body.appendChild(p);
                }
            });



        }
    }

})