let tabla = (window.prompt('Introduce un número'));
let booleano = isNaN(parseInt(tabla)) | isNaN(tabla);

if (booleano) {
    window.alert('NO HAS INTRODUCIDO UN NÚMERO');
    document.write('<p>¯\\_(ツ)_/¯');
}

for (i = 1; i < 11 && !booleano; i++) {
    document.write('<p>' + tabla + ' x ' + i + ' = ' + (tabla * i) + '</p>');
}