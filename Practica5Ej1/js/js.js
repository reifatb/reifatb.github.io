window.onload = function () {
    const recuadro = document.getElementById('recuadro');
    const select = document.getElementsByTagName('select');


    addEvent();
    estilo();

    function addEvent() {
        for (i = 0; i < select.length; i++) {
            select[i].addEventListener('change', estilo);
        }
    }

    function estilo() {
        let valores = '';
        for (i = 0; i < select.length; i++) {
            valores += select[i].getAttribute('name') + ':' + select[i].value + ';';

        }
        recuadro.setAttribute('style', valores);
    }
}
