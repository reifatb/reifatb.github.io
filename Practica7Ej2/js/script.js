window.onload = function () {
    const paragraph = document.getElementById('paragraph');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    let boolean = true;
    let disabled = false;

    function appearance() {
        if (boolean) {
            paragraph.style.display = 'block';
            button1.innerText = 'Esconder';
            boolean = false;

        } else {
            paragraph.style.display = 'none';
            button1.innerText = 'Mostrar';
            boolean = true;
        }
    }

    function disable() {
        if (disabled) {
            button1.removeAttribute('disabled');
            disabled = false;

        } else {
            button1.setAttribute('disabled', '');
            disabled = true;
        }
    }

    appearance();
    button1.addEventListener('click', appearance)
    button2.addEventListener('click', disable);

}