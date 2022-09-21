const entrada = document.getElementById('entrada');
const boton = document.getElementById('boton');
const nota = document.getElementById('nota');
let numero = parseInt(entrada.value);

boton.addEventListener('click', evaluar);

function esNumero(dato) {
    return !isNaN(dato);
}

function note(numero) {
    let nota;
    switch (numero) {
        case 5:
            nota = 'Aprobado';
            break;

        case 6:
            nota = 'Bien';
            break;

        case 7:
        case 8:
            nota = 'Notable';
            break;

        case 9:
        case 10:
            nota = 'Sobresaliente';
            break

        default:
            nota = 'Suspenso';
    }

    return nota;
}

function evaluar() {
    if (esNumero(numero)) {
        nota.innerHTML = 'La nota es un ' + note(numero);
        alert(`La nota es un ${note(numero)}`);
    }
}