window.addEventListener("DOMContentLoaded", () => {
    const squareCanvas = document.getElementById("squareCanvas");
    const squareSize = document.getElementById('squareSize');
    const squareForm = document.getElementById('squareForm');
    const squareColor = document.getElementById('squareColor');

    const triangleCanvas = document.getElementById("triangleCanvas");
    const triangleSize = document.getElementById('triangleSize');
    const triangleForm = document.getElementById('triangleForm');
    const triangleColor = document.getElementById('triangleColor');

    const circleCanvas = document.getElementById("circleCanvas");
    const circleRadius = document.getElementById('circleRadius');
    const circleForm = document.getElementById('circleForm');
    const circleColor = document.getElementById('circleColor');


    squareCanvas.setAttribute('width', `250`);
    squareCanvas.setAttribute('height', `250`);
    triangleCanvas.setAttribute('width', `250`);
    triangleCanvas.setAttribute('height', `250`);
    circleCanvas.setAttribute('width', `250`);
    circleCanvas.setAttribute('height', `250`);

    squareForm.addEventListener('submit', e => {
        e.preventDefault();
        const ctxSquareCanvas = squareCanvas.getContext("2d");
        ctxSquareCanvas.fillStyle = squareColor.value
        const square = new Cuadrado(squareSize.value, squareCanvas.getAttribute('width'));
        square.dibujar(ctxSquareCanvas);
    });

    triangleForm.addEventListener('submit', e => {
        e.preventDefault();
        const ctxtriangleCanvas = triangleCanvas.getContext("2d");
        ctxtriangleCanvas.fillStyle = triangleColor.value
        const triangle = new Triangulo(triangleSize.value, triangleCanvas.getAttribute('width'));
        triangle.dibujar(ctxtriangleCanvas);
    });

    circleForm.addEventListener('submit', e => {
        e.preventDefault();
        const ctxCircleCanvas = circleCanvas.getContext("2d");
        ctxCircleCanvas.fillStyle = 'blue'
        ctxCircleCanvas.clearRect(0, 0, 250, 250);
        ctxCircleCanvas.fillStyle = circleColor.value
        const circle = new Circulo(circleRadius.value, circleCanvas.getAttribute('width'));
        circle.dibujar(ctxCircleCanvas);
        console.log(circle)
    });

});