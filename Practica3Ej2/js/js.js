window.onload = function () {
    const entrada1 = document.getElementById('entrada1');
    const entrada2 = document.getElementById('entrada2');
    const abrir = document.getElementById('abrir');
    const cerrar = document.getElementById('cerrar');

    let ventana;
    let mover = document.getElementById('mover');
    mover.addEventListener('click', () => { ventana.moveTo(150, 150) })


    abrir.addEventListener('click', abrirVentana);
    cerrar.addEventListener('click', cerrarVentana);


    function abrirVentana() {
        let opciones = `width=${entrada1.value},height=${entrada2.value}`;
        if (!ventana || ventana.closed) {
            ventana = window.open('ventana.html', 'Ventana creada', opciones);
            console.log(ventana.name)
            escribirVentana();
        }

    }

    function cerrarVentana() {
        if (ventana && !ventana.closed) {
            ventana.close();
        }
    }

    function escribirVentana() {
        //ventana.document.appendChild('<button id="botonCerrar">Cerrar</button>');
        let botonCerrar = ventana.document.createElement('button');
        //ventana.document.getElementsByTagName('p')[0].appendChild(botonCerrar);
        //ventana.document.appendChild(botonCerrar);
        botonCerrar.addEventListener('click', () => { ventana.close() });
        console.log(ventana.document.getElementsByTagName('p')[0])
    }

}