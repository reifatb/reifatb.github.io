window.onload = function () {
    const agenda = new Array();
    console.log(agenda);

    function agendar(fecha, texto) {
        let evento = [fecha, texto];
        agenda.push(evento);
    }

}