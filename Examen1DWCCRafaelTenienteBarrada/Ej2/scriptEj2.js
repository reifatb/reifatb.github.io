window.addEventListener('DOMContentLoaded', () => {
    const inputs = document.getElementsByTagName('input');
    let numero = '';
    let ventana = null;

    function write() {
        for (let i = 0; i < inputs.length - 1; i++) {
            inputs[i].addEventListener('keypress', e => {
                e.preventDefault();
                for (let j = 0; j < 10; j++) {
                    if (e.key == j) {
                        inputs[i].value = '*';
                        numero += e.key;
                    }
                }
                console.log(numero);
            });
        }
    }

    write();

    inputs[5].addEventListener('click', e => {
        e.preventDefault();
        if (ventana) {
            ventana.close();
        }
        ventana = window.open("", "", 'width=250px,height=250px');

        const p = ventana.document.createElement('p');
        p.innerText = `Bienvenido ${numero}`;
        p.style.backgroundColor = 'orange';
        p.style.fontWeight = 'bold';
        ventana.document.body.append(p);

        const button = ventana.document.createElement('button');
        button.innerText = 'Cerrar';
        button.setAttribute('onclick', 'window.close()');
        ventana.document.body.append(button);
    });

});