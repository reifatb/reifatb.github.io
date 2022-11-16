window.onload = function () {
    const input = document.querySelector('input');
    const regex = new RegExp('\\d');

    input.addEventListener('keypress', e => {
        e.preventDefault();
        if (regex.test(e.key)) {
            input.value += e.key;
        };
    })

}