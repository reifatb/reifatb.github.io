window.onload = function () {
    const entradas = document.getElementById('entradas');
    const entrada1 = document.getElementById('entrada1');
    const entrada2 = document.getElementById('entrada2');
    const entrada3 = document.getElementById('entrada3');
    const crearMatrices = document.getElementById('crearMatrices');
    const sumarMatrices = document.getElementById('sumarMatrices');
    const sumandos = document.getElementById('sumandos');
    const resultados = document.getElementById('resultados');

    let filas = parseInt(entrada1.value);
    let columnas = parseInt(entrada2.value);
    let numMatrices = parseInt(entrada3.value);
    let resultado;

    sumarMatrices.setAttribute('disabled', '');

    crearMatrices.addEventListener('click', () => {
        leerEntradas();
        if (comprobarInputs(entradas) && filas > 0 && columnas > 0 && numMatrices > 0) {
            borrarMatrices(sumandos);
            borrarMatrices(resultados)
            //Borra el fondo de CSS (pone display none)
            resultados.classList.add('containerMatriz');
            matrices(numMatrices, 'sumando', sumandos, 'input');
            pintarTitulo('Sumandos', sumandos)
            activarSuma();
            //Le pone fondo de CSS (quita display none)
            sumandos.classList.remove('containerMatriz');
        } else {
            sumarMatrices.setAttribute('disabled', '');
            borrarMatrices(sumandos);
            //Borra el fondo de CSS (pone display none)
            sumandos.classList.add('containerMatriz');
        }
    });

    sumarMatrices.addEventListener('click', () => {
        if (comprobarInputs(sumandos)) {
            borrarMatrices(resultados);
            matrices(1, 'resultado', resultados, 'span')
            sumar();
            pintarTitulo('Resultado', resultados);
            //Le pone fondo de CSS (quita display none)
            resultados.classList.remove('containerMatriz');
        } else {
            borrarMatrices(resultados);
            //Borra el fondo de CSS (pone display none)
            resultados.classList.add('containerMatriz');
        }
    });



    function matrices(numeroMatrices, id, donde, tipoCelda) {
        for (i = 0; i < numeroMatrices; i++) {
            let matriz = document.createElement('div');
            matriz.setAttribute('id', `${id}${i}`);
            matriz.setAttribute('class', 'matriz');

            for (j = 0; j < filas; j++) {
                let parrafo = document.createElement('p');

                for (k = 0; k < columnas; k++) {
                    let celda = document.createElement(tipoCelda);
                    celda.setAttribute('type', 'text');
                    parrafo.appendChild(celda);
                }

                matriz.appendChild(parrafo);
            }

            donde.appendChild(matriz);
        }
    }

    function activarSuma() {
        sumarMatrices.removeAttribute('disabled')
    }

    function borrarMatrices(queBorrar) {
        queBorrar.innerHTML = '';
    }

    function leerEntradas() {
        filas = parseInt(entrada1.value);
        columnas = parseInt(entrada2.value);
        numMatrices = parseInt(entrada3.value);
    }

    function sumar() {
        resultado = document.getElementById('resultado0');
        let sumMatriz = sumandos.getElementsByClassName('matriz');

        for (i = 0; i < filas; i++) {
            for (j = 0; j < columnas; j++) {

                let suma = 0;

                for (k = 0; k < sumMatriz.length; k++) {
                    let valor = parseFloat(document.getElementById(`sumando${k}`).children[i].children[j].value);

                    suma += valor;
                }

                resultado.children[i].children[j].innerHTML = suma;
            }
        }

    }

    function isNumber(n) {
        //https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }

    function comprobarInputs(donde) {
        let rango = donde.getElementsByTagName('input');
        let esNum = true;
        for (i = 0; i < rango.length; i++) {
            if (isNumber(rango[i].value) === false) {
                esNum = false;
            };
        }

        return esNum;
    }

    function pintarTitulo(titulo, donde) {
        let tit = document.createElement('p');
        let titu = document.createTextNode(titulo);
        tit.appendChild(titu);
        donde.insertBefore(tit, donde.children[0]);
    }

}