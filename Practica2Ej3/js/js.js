const entrada = document.getElementById('entrada');
const botonAceptar = document.getElementById('botonAceptar');
const botonBorrar = document.getElementById('botonBorrar');
const resultado = document.getElementById('resultado');
const noNumero = document.getElementById('noNumero');
let numero = parseInt(entrada.value);
let numeros = new Array();
let contador = 0;
let suma = 0;
let media = 0;

botonAceptar.addEventListener('click', sumaYMedia);
botonBorrar.addEventListener('click', borrar);
noNumero.style.display = 'none';
entrada.focus();

function esNumero(dato) {
    return !isNaN(dato);
}

function guardarNumero() {
    numeros[contador] = numero;
    contador++;
}

function sumaYMedia() {
    numero = parseInt(entrada.value);
    if (esNumero(numero)) {
        noNumero.style.display = 'none';

        if (numero === 0 && numeros.length > 0) {
            for (let i = 0; i < numeros.length; i++) {
                suma += numeros[i];
            }
            media = suma / numeros.length;
            resultado.innerHTML = `La suma de los números es ${suma} y la media es ${media}`
        } else {
            guardarNumero();
            escribir();
        }

    } else {
        noNumero.style.display = 'block';
    }

    entrada.value = '';
    entrada.focus();
}

function escribir() {
    if (numeros.length === 1) {
        let text = document.createTextNode(numero);
        document.getElementById('numeros').appendChild(text);
    } else {
        let text = document.createTextNode(", " + numero);
        document.getElementById('numeros').appendChild(text);
    }
}

function borrar() {
    document.getElementById('numeros').innerHTML = 'Números introducidos:&nbsp';
    resultado.innerHTML = '';
    numeros = new Array();
    contador = 0;
    suma = 0;
    media = 0;
    entrada.value = '';
    entrada.focus();
}