window.addEventListener('DOMContentLoaded', (event) => {
    let input1 = document.getElementById('input1');
    let input2 = document.getElementById('input2');
    let suma = document.getElementById('suma');
    let resta = document.getElementById('resta');
    let multiplicacion = document.getElementById('multiplicacion');
    let division = document.getElementById('division');
    let instrucciones = document.getElementById('instrucciones');
    let random = 0;
    //let boton = document.getElementById(button);

    document.getElementById('button').addEventListener('click', listo);
    document.getElementById('switchPalette').addEventListener('click', switchPalette);

    input1.addEventListener("keypress", teclaEnter);
    input2.addEventListener("keypress", teclaEnter);

    switchPalette();

    function listo() {
        if (isNumber(input1.value) && isNumber(input2.value)) {
            instrucciones.style.display = 'none';

            let numero1 = parseFloat(input1.value);
            let numero2 = parseFloat(input2.value);

            suma.innerHTML = 'La suma es ' + (numero1 + numero2);
            suma.style.display = 'block';
            resta.innerHTML = 'La resta es ' + (numero1 - numero2);
            resta.style.display = 'block';
            multiplicacion.innerHTML = 'La multiplicación es ' + (numero1 * numero2);
            multiplicacion.style.display = 'block';
            division.innerHTML = 'La división es ' + (numero1 / numero2);
            division.style.display = 'block';

        } else {
            instrucciones.style.display = 'block';
            suma.style.display = 'none';
            resta.style.display = 'none';
            multiplicacion.style.display = 'none';
            division.style.display = 'none';
        }

    }

    function isNumber(n) {
        //https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }

    function teclaEnter(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("button").click();
        }
    }


    function switchPalette() {
        let css = document.getElementsByTagName('link')[1];
        let palette = Math.floor(Math.random() * 4 + 1);

        while (palette === random) {
            palette = Math.floor(Math.random() * 4 + 1);
        }

        css.setAttribute('href', `css/paleta${palette}.css`);
        //css.href = `paleta${palette}`;

        random = palette;
    }

});