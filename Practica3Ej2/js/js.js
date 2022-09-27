window.onload = function () {
    const entrada1 = document.getElementById('entrada1');
    const entrada2 = document.getElementById('entrada2');
    const abrir = document.getElementById('abrir');
    const cerrar = document.getElementById('cerrar');
    let ventana;
    const botonVentana = document.getElementById('botonVentana');

    abrir.addEventListener('click', abrirVentana);
    cerrar.addEventListener('click', cerrarVentana);
    botonVentana.addEventListener('click', () => { window.close() });

    function abrirVentana() {
        let opciones = `width=${entrada1.value},height=${entrada2.value}`;
        if (!ventana || ventana.closed) {
            ventana = window.open('ventana.html', 'Ventana creada', opciones);
            escribirVentana();
        }

    }

    function cerrarVentana() {
        if (ventana && !ventana.closed) {
            ventana.close();
        }
    }

    function escribirVentana() {
        ventana.document.write('<button id="botonCerrar">Cerrar</button>');
        let botonCerrar = ventana.document.getElementById('botonCerrar');
        botonCerrar.addEventListener('click', () => { ventana.close() });
    }

}