window.onload = function () {
    const paragraph = document.getElementById('paragraph');
    const button = document.getElementById('button');
    let boolean = true;

    function appearance() {
        if (boolean) {
            paragraph.style.display = 'block';
            button.innerText = 'Esconder';
            boolean = false;

        } else {
            paragraph.style.display = 'none';
            button.innerText = 'Mostrar';
            boolean = true;
        }
    }

    appearance();
    button.addEventListener('click', appearance)

}