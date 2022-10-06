window.onload = function () {
    const parrafo = document.getElementById('result');
    const enviar = document.querySelector('[type="submit"]');

    enviar.pre
    enviar.addEventListener('click', e => {
        e.preventDefault();
        estilo();
    });

    //estilo();

    function estilo() {
        let texto = document.querySelector('[type="text"]');
        let color = document.querySelector('input[type="color"]');
        let fuente = document.querySelector('input[name="Fuente"]:checked');
        let efectos = document.querySelectorAll('[type="checkbox"]');

        parrafo.innerHTML = texto.value;
        parrafo.style.color = color.value;
        parrafo.style.fontFamily = fuente.value;

        for (i = 0; i < efectos.length; i++) {
            if (efectos[i].checked === true) {
                parrafo.classList.add(efectos[i].value);
            } else {
                parrafo.classList.remove(efectos[i].value);

            }
        }
    }

}