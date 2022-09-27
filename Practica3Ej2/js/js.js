window.onload = function () {
    const entrada1 = document.getElementById('entrada1');
    const entrada2 = document.getElementById('entrada2');
    const abrir = document.getElementById('abrir');
    const cerrar = document.getElementById('cerrar');
    let ventana;

    abrir.addEventListener('click', abrirVentana);
    cerrar.addEventListener('click', cerrarVentana);


    function abrirVentana() {
        let opciones = `width=${entrada1.value},height=${entrada2.value}`;
        if (!ventana || ventana.closed) {
            ventana = window.open('', 'Ventana creada', opciones);
            console.log(ventana.innerWidth);
            console.log(ventana.innerHeight);
        }

    }

    function cerrarVentana() {
        if (ventana && !ventana.closed) {
            ventana.close();
        }
    }
}