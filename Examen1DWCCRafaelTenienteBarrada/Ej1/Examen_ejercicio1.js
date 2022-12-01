window.addEventListener("DOMContentLoaded", () => {
    const cantidad = document.getElementById("cantidad");
    const crear = document.getElementById("crear");
    const circulo = document.getElementById("circulo");
    const numero = document.getElementById("numero");
    const borrar = document.getElementById("borrar");
    const numeroAnterior = document.getElementById("numeroAnterior");
    const antes = document.getElementById("antes");
    const numeroPosterior = document.getElementById("numeroPosterior");
    const despues = document.getElementById("despues");
    const seccion = document.getElementById("seccion");
    const regexId = /div/;

    function crearDiv(cantidad) {
        seccion.innerHTML = '';
        for (let i = 0; i < cantidad; i++) {
            const div = document.createElement("div");
            div.setAttribute("id", `div${i + 1}`);
            div.classList.add('caja');
            div.innerText = `${i + 1}`;
            seccion.appendChild(div);
        }
        listen();
    }

    function circular() {
        const cajas = document.getElementsByClassName('caja');
        for (let caja of cajas) {
            caja.style.borderRadius = '50%';
        }
    }

    function borrarDiv(id) {
        const div = document.getElementById(`div${id}`);
        div.remove();
    }

    function insertarAntes(id) {
        const div = document.getElementById(`div${id}`);
        const anterior = document.createElement("div");
        anterior.classList.add('caja');
        anterior.classList.add('roja');
        seccion.insertBefore(anterior, div);
    }

    function insertarDespues(id) {
        const div = document.getElementById(`div${id}`);
        const despues = document.createElement("div");
        despues.classList.add('caja');
        despues.classList.add('verde');
        seccion.insertBefore(despues, div.nextSibling);
    }

    function hoverIn(element) {
        element.classList.add('amarillo');
    }

    function hoverOut(element) {
        element.classList.remove('amarillo');
    }

    function listen() {
        const cajas = document.getElementsByClassName('caja');
        for (let caja of cajas) {
            caja.addEventListener('mouseenter', () => { hoverIn(caja) });
            caja.addEventListener('mouseleave', () => { hoverOut(caja) });
        }
    }


    crear.addEventListener('click', e => {
        e.preventDefault();
        crearDiv(cantidad.value);
    });

    circulo.addEventListener('click', e => {
        e.preventDefault();
        circular();
    });

    borrar.addEventListener('click', e => {
        e.preventDefault();
        borrarDiv(numero.value);
    });

    antes.addEventListener('click', e => {
        e.preventDefault();
        insertarAntes(numeroAnterior.value);
    });

    despues.addEventListener('click', e => {
        e.preventDefault();
        insertarDespues(numeroPosterior.value);
    });

    seccion.addEventListener('click', e => {
        if (regexId.test(e.target.getAttribute('id'))) {
            e.target.style.borderRadius = '25%';
            e.target.classList.add('naranja');
        }
    });


});