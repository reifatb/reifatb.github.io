'use strict'
var pais = "españa"
document.write("Esto es JavaScript" + "<br>")
document.write(pais)

//prueba de variables con var
var numero = 10;
console.log(numero);//Valor es 10
if (true) {
    var numero = 20;
    console.log(numero);//Valor es 20
}
console.log(numero); //Valor es 20

//prueba de variables con let
var texto = "Este es mi primer texto";
console.log(texto);
if (true) {
    let texto = "Este es mi texto con let";
    console.log(texto);
}
console.log(texto);

// prueba de declaracion variables con el mismo nombre con var 
var x1 = 1
var x1 = 2
console.log("Variables con var " + x1)

// prueba de declaracion variables con el mismo nombre con let
let x2 = 1
//let x2=2
console.log("Variables con var " + x2)
