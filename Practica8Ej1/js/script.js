window.onload = function () {
    const cars = document.getElementsByClassName('car');
    const button = document.getElementById('button');
    let startPosition1 = 0;
    let startPosition2 = 0;
    let interval;

    button.addEventListener('click', start);

    function start() {
        setInterval(speed, 1000);
    }

    function forwards() {
        startPosition1++;
        startPosition2++
        cars[0].style.left = `${startPosition1}px`;
        cars[1].style.left = `${startPosition2}px`;

    }

    function time() {
        return Math.random() * (3000 - 0) + 0;
    }

    function speed() {
        clearInterval(interval);
        interval = setInterval(forwards, time);
        return interval;
    }


}