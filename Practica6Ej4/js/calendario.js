window.onload = function () {
    const fecha = new Date();
    const anno = document.getElementById('anno');
    const mes = document.getElementById('mes');
    anno.value = fecha.getFullYear();
    mes.value = fecha.getMonth() + 1;
    const divCalendario = document.getElementById('divCalendario')
    let calendarioPrimerDia = new Date(anno.value, mes.value - 1);
    console.log(calendarioPrimerDia);

    const semana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];


    const getWeekNumOfMonthOfDate = (d) => {
        const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
        return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
    }

    function calendar() {
        let calendarioUltimoDia = new Date(anno.value, mes.value, 0);
        divCalendario.innerHTML = '';
        let dia = 1;
        const tabla = document.createElement('table');
        const filaSemana = document.createElement('tr');
        tabla.appendChild(filaSemana);

        for (i = 1; i < 8; i++) {
            let columna = document.createElement('td');
            filaSemana.appendChild(columna);
            let p = document.createElement('p');
            columna.appendChild(p);
            p.textContent = semana[i - 1];
        }

        for (i = 1; i <= getWeekNumOfMonthOfDate(calendarioUltimoDia); i++) {
            console.log(getWeekNumOfMonthOfDate(calendarioUltimoDia));
            let fila = document.createElement('tr');
            tabla.appendChild(fila);

            for (j = 1; j < 8; j++) {
                let columna = document.createElement('td');
                fila.appendChild(columna);

                if ((j === new Date(anno.value, mes.value - 1, dia).getDay() || (j === 7 && new Date(anno.value, mes.value - 1, dia).getDay()) === 0) && dia <= new Date(anno.value, mes.value, 0).getDate()) {
                    let p = document.createElement('p');
                    columna.appendChild(p);
                    p.textContent = dia;
                    dia++;
                }

            }

        }
        divCalendario.appendChild(tabla);
    }

    calendar();

    anno.addEventListener('keyup', calendar);
    mes.addEventListener('keyup', calendar);

    // const weekNumOfDate = getWeekNumOfMonthOfDate(new Date(2022, 1, 20))
    // console.log(weekNumOfDate)

}