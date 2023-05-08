async function getArrayArticulos() {
    // return fetch('articulos.json')
    //     .then(response => response.json())
    //     .then(json => json.articulos)
    //     .catch(() => {
    //         console.error('error');
    //     })
    try {
        const response = await fetch('articulos.json');
        const json = await response.json();
        return json.articulos;
    } catch (error) {
        console.error(error);
    }
}

function fillHTML(articulo) {
    const elements = document.getElementById('elements');

    const div = document.createElement('div');
    div.setAttribute('id', articulo.nombre);
    elements.appendChild(div);

    const title = document.createElement('h2');
    div.appendChild(title);
    title.innerHTML = articulo.nombre;

    const price = document.createElement('p');
    div.appendChild(price);
    price.innerHTML = articulo.precio;

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    div.appendChild(input);

    const kgUnit = document.createElement('p');
    kgUnit.innerHTML = '&nbsp;Kg';
    kgUnit.style.display = 'inline-block'
    div.appendChild(kgUnit);

    const buy = document.createElement('button');
    buy.innerHTML = 'Comprar';
    buy.style.display = 'block'
    div.appendChild(buy);
    buy.addEventListener('click', () => {
        createLineaTicket(title.innerHTML, price.innerHTML, input.value, price * input.value)
    });
}

function createLineaTicket(concepto, precio, cantidad) {
    const precioFloat = parseFloat(precio);
    const cantidadInt = parseInt(cantidad);
    const lineaTicket = {
        concepto,
        precio: precioFloat,
        cantidad: cantidadInt,
        valor: precioFloat * cantidadInt
    };

    localStorage.setItem(concepto, JSON.stringify(lineaTicket));
}

function mostrarTicket(array) {
    limpiarTicket();
    const ticket = document.getElementById('ticket');

    for (let articulo of array) {
        const storageLine = localStorage.getItem(articulo.nombre);
        const ticketLine = JSON.parse(storageLine);

        if (ticketLine) {
            const line = document.createElement('tr');
            line.setAttribute('class', 'line')
            ticket.appendChild(line);
            for (let atributo in ticketLine) {
                const td = document.createElement('td');
                td.innerHTML = ticketLine[atributo];
                line.appendChild(td);
            }
        }
    }
}

function vaciarTicket() {
    limpiarTicket();
    localStorage.clear();
}

function limpiarTicket() {
    const ticket = document.getElementById('ticket');
    ticket.innerHTML = '';
}

window.addEventListener('DOMContentLoaded', async () => {
    const mostrar = document.getElementById('mostrar');
    const vaciar = document.getElementById('vaciar');
    // getArrayArticulos().then((articulosArray) => {
    //     for (let articulo of articulosArray) {
    //         fillHTML(articulo);
    //     }

    //     mostrar.addEventListener('click', () => { mostrarTicket(articulosArray) });
    //     vaciar.addEventListener('click', vaciarTicket);
    // });
    const articulosArray = await getArrayArticulos();
    for (let articulo of articulosArray) {
        fillHTML(articulo);
    }
    mostrar.addEventListener('click', () => { mostrarTicket(articulosArray) });
    vaciar.addEventListener('click', vaciarTicket);
});