window.onload = function () {
    const fecha = new Date();
    const diaMes = fecha.getDate();
    const diaSemana = fecha.getDay();
    const anno = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;

    const fecha1 = document.getElementById('fecha1');
    const fecha2 = document.getElementById('fecha2');
    const fecha3 = document.getElementById('fecha3');
    const fecha4 = document.getElementById('fecha4');
    const fecha5 = document.getElementById('fecha5');

    fecha1.textContent = `${diaMes}/${mes}/${anno}`;
    fecha2.textContent = `${diaMes} de ${nombrarMes(mes)} de ${anno}`;
    fecha3.textContent = `${nombrarDia(diaSemana)}, ${diaMes} de ${nombrarMes(mes)} de ${anno}`;
    fecha4.textContent = `${nombrarMes(mes)} ${anno}`
    pintarFecha4();
    fecha5.textContent = ``;
    pintarFecha5();

    function nombrarMes(mes) {
        switch (mes) {
            case 1:
                return 'Enero';
                break;
            case 2:
                return 'Febrero';
                break;
            case 3:
                return 'Marzo';
                break;
            case 4:
                return 'Abril';
                break;
            case 5:
                return 'Mayo';
                break;
            case 6:
                return 'Junio';
                break;
            case 7:
                return 'Julio';
                break;
            case 8:
                return 'Agosto';
                break;
            case 9:
                return 'Septiembre';
                break;
            case 10:
                return 'Octubre';
                break;
            case 11:
                return 'Noviembre';
                break;
            case 12:
                return 'Diciembre';
                break;
        }
    }

    function nombrarDia(dia) {
        switch (dia) {
            case 1:
                return 'Domingo';
                break;
            case 2:
                return 'Lunes';
                break;
            case 3:
                return 'Martes';
                break;
            case 4:
                return 'Miércoles';
                break;
            case 5:
                return 'Jueves';
                break;
            case 6:
                return 'Viernes';
                break;
            case 7:
                return 'Sábado';
                break;

        }
    }


    function pintarFecha4() {
        for (i = 0; i < getDaysInMonth(anno, mes); i++) {
            let dia = document.createElement('span');
            let texto = document.createTextNode(i + 1);
            dia.appendChild(texto);
            fecha4.appendChild(dia);
            dia.classList.add('dia');
            if (i + 1 == diaMes) {
                dia.classList.add('hoy')
            }
        }
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function fechar5(fila) {
        switch (fila) {
            case 0:
                return nombrarDia(diaSemana);
                break;
            case 1:
                return anno;
                break;
            case 2:
                return diaMes;
                break;
            case 3:
                return nombrarMes(mes);
                break;
        }
    }

    function pintarFecha5() {
        for (i = 0; i < 4; i++) {
            let fila = fecha5.appendChild(document.createElement('tr'));
            let columna = document.createElement('td');
            fila.appendChild(columna);
            columna.textContent = fechar5(i);
        }

    }

}