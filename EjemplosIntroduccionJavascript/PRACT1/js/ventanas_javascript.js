//prueba de alertas y confirmacion
'use strict'
alert("Prueba de alerta");

var miresultado=confirm("Estas seguro de querer continuar");
console.log(miresultado);

//Ingreso de datos
var numero=prompt("Introduce un numero",1);
console.log(numero);
console.log(typeof(numero));
//El resultado siempre va a ser un string
var numero=parseInt(numero);
console.log(numero);
console.log(typeof(numero));