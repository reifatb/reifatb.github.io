class Cuadrado extends Forma {
    constructor(lado, ladoLienzo) {
        super();
        this.lado = lado;
        const x = (ladoLienzo - lado) / 2;
        const y = x;
        this.centro = new Punto(x, y);
    }

    dibujar(ctx) {
        return ctx.fillRect(this.centro.x, this.centro.y, this.lado, this.lado);
    }
}

