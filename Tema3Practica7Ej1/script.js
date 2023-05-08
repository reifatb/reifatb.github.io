window.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementsByTagName('img');

    function switchImg(i) {
        const src = i.getAttribute('src');
        const letter = src.substring(6, 7);
        const iniSRC = src.substring(0, 6);
        const endSRC = src.substring(7, src.length);

        if (letter === 'a') {
            i.setAttribute('src', `${iniSRC}b${endSRC}`)
        } else {
            i.setAttribute('src', `${iniSRC}a${endSRC}`)
        }
    }

    function howToSwitch() {
        for (let i of img) {
            const id = parseInt(i.getAttribute('id'));
            console.log(id);

            if (id < 4) {
                setInterval(() => { switchImg(i) }, 300)
            } else {
                i.addEventListener('mouseenter', () => { switchImg(i) });
                i.addEventListener('mouseleave', () => { switchImg(i) });
            }
        }
    }

    howToSwitch();
});