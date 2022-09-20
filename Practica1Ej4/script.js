let numero = 4590;
let cifras = 0;
let cociente = numero;

do {
    cociente = Math.floor(cociente / 10);
    cifras++;
} while (cociente !== 0)

console.log(cifras);