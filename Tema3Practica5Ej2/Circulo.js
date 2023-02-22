class Circulo extends Forma {
    constructor(radio, ladoLienzo) {
        super();
        this.radio = radio;
        this.centerX = ladoLienzo / 2;
        this.centerY = ladoLienzo / 2;
    }

    dibujar(ctx) {
        ctx.arc(this.centerX, this.centerY, this.radio, 0, Math.PI * 2);
        ctx.fill();
    }
}