const articulosArray = new Array();

function fetchFunction() {
    fetch('articulos.json')
        .then(data => data.json())
        .then(json => {
            for (let articulo of json.articulos) {
                articulosArray.push(articulo);
            }
        })
        .catch(() => { console.log('error'); })
}

function fillHTML(articulo) {
    const div = document.createElement('div');
    div.setAttribute('id', articulo.nombre);
    document.body.appendChild(div);

    const title = document.createElement('h2');
    div.appendChild(title);
    title.innerHTML = articulo.nombre;

    const precio = document.createElement('p');
    div.appendChild(precio);
    precio.innerHTML = articulo.precio;

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    div.appendChild(input);

}

window.addEventListener('DOMContentLoaded', () => {

    fetchFunction();
    console.log(articulosArray);
    console.log(articulosArray[0].nombre)


    for (let articulo of articulosArray) {
        console.log('bucle')
        console.log(articulo);
        fillHTML(articulo);
    }

});