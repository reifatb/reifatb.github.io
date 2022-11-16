window.onload = function () {
    const container = document.getElementById('container');
    const textarea = document.getElementById('textarea');
    let write = false;
    let text = '';

    textarea.setAttribute('disabled', 'true');

    document.addEventListener('keydown', e => {
        writeAndSave(e);

    })

    function writeAndSave(e) {
        const crtlE = e.ctrlKey && e.key === 'e';
        const crtlS = e.ctrlKey && e.key === 's';
        const escape = e.key === 'Escape';

        if (crtlE && !write) {
            e.preventDefault();
            write = true;
            text = textarea.value;
            textarea.removeAttribute('disabled');
            textarea.focus();
        } else if (crtlS) {
            e.preventDefault();
            write = false;
            textarea.setAttribute('disabled', 'true');
        } else if (escape) {
            e.preventDefault();
            write = false;
            textarea.value = text;
            textarea.setAttribute('disabled', 'true');
        }
    }

    // function writting(e) {
    //     if (write) {
    //         textarea.value += e.key;
    //     }
    // }

}