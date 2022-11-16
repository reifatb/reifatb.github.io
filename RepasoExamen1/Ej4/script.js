window.addEventListener('DOMContentLoaded', () => {
    const piramide = document.getElementById('piramide');
    const input = document.getElementById('input');
    const submit = document.getElementById('submit');
    const p = document.getElementsByTagName('p');
    const title = document.getElementById('title');

    function drawPiramide() {
        piramide.innerHTML = '';
        let lastLine = '';
        for (let i = 1; i <= input.value; i++) {
            const line = lastLine + ' ' + i.toString();
            lastLine = line;
            const p = document.createElement('p');
            p.innerText += '\n' + line;
            p.style.backgroundColor = randomColor();
            p.style.width = 'fit-content';
            piramide.appendChild(p);
        }
        piramide.style.width = 'fit-content';
        piramide.style.textAlign = 'center';
    }

    function randomColor() {
        // const number1 = Math.floor(Math.random() * 256);
        // const number2 = Math.floor(Math.random() * 256);
        // const number3 = Math.floor(Math.random() * 256);
        // const color = `rgb(${number1}, ${number2}, ${number3})`;
        const color = `#${Math.floor(Math.random() * 16777217).toString(16)}`

        return color;
    }

    function blink() {
        setInterval(colorP, 500);
    }

    function colorP() {
        for (let paragraph of p) {
            paragraph.style.backgroundColor = randomColor();
        }
    }

    submit.addEventListener('click', e => {
        e.preventDefault();
        drawPiramide();
    });

    piramide.addEventListener('click', (e) => {
        if (e.target.tagName === 'P') {
            e.target.remove();
        }
    });

    blink();

});