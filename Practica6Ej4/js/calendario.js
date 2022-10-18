window.onload = function () {
    //<- Calendario
    const hoy = new Date();
    const anno = document.getElementById('anno');
    const mes = document.getElementById('mes');
    anno.value = hoy.getFullYear();
    mes.value = hoy.getMonth() + 1;
    const divCalendario = document.getElementById('divCalendario')
    const semana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const numDiasSemana = 7;
    const regExNumber = /\d/;
    //Calendario ->

    //<- Agenda
    const agenda = new Array();
    const containerAgenda = document.getElementById('containerAgenda');
    const divAgenda = document.getElementById('divAgenda');
    let dias;
    let diaSelect;
    const form = document.createElement('form');
    const buttonCreateEvent = document.createElement('button');
    buttonCreateEvent.innerText = 'Agendar Evento';
    buttonCreateEvent.classList.add('button');
    buttonCreateEvent.addEventListener('click', () => { openForm(form) });
    containerAgenda.appendChild(buttonCreateEvent);
    //Agenda ->

    function calendar() {
        divCalendario.innerHTML = '';
        let dia = 1;
        const tabla = document.createElement('table');
        const filaSemana = document.createElement('tr');
        tabla.appendChild(filaSemana);

        for (let i = 1; i < 8; i++) {
            let columna = document.createElement('th');
            filaSemana.appendChild(columna);
            columna.textContent = semana[i - 1];
        }

        const numSemanasMes = getNumSemanasMes(anno.value, mes.value);

        for (let numSemanaMes = 1; numSemanaMes <= numSemanasMes; numSemanaMes++) {
            let fila = document.createElement('tr');
            tabla.appendChild(fila);

            for (let numDiaSemana = 1; numDiaSemana <= numDiasSemana; numDiaSemana++) {
                let columna = document.createElement('td');
                fila.appendChild(columna);

                const fechaActual = new Date(anno.value, mes.value - 1, dia);
                const numDiaSemanaActual = fechaActual.getDay();
                const diaActual = fechaActual.getDate();
                const esDomingo = numDiaSemanaActual === 0;
                const esUltimaColumna = numDiaSemana === numDiasSemana;

                if ((numDiaSemana === numDiaSemanaActual || (esUltimaColumna && esDomingo)) && dia <= diaActual) {
                    let p = document.createElement('p');
                    columna.appendChild(p);
                    p.textContent = dia;
                    dia++;

                    for (let i = 0; i < agenda.length; i++) {
                        if (fechaActual.getTime() === agenda[i][0].getTime()) {
                            p.classList.add('diaConEvento');
                        }
                    }
                }


            }

        }
        divCalendario.appendChild(tabla);
        dias = document.querySelectorAll('td p');
        clicarDias();
    }

    calendar();
    containerAgenda.classList.add('containerNone');
    containerAgenda.setAttribute('id', '');

    anno.addEventListener('keypress', e => {
        e.preventDefault();
        if (regExNumber.test(e.key)) {
            if (isTextSelected()) {
                anno.value = e.key
            } else {
                anno.value += e.key;
            }
            calendar();
        }

    });

    mes.addEventListener('keypress', e => {
        e.preventDefault();
        if (regExNumber.test(e.key)) {
            mes.value += e.key;
            calendar();
        }
    });

    function clicarDias() {
        for (let i = 0; i < dias.length; i++) {
            dias[i].addEventListener('click', () => {
                diaSelect = new Date(anno.value, mes.value - 1, i + 1);
                abrirAgenda();
            });
        }
    }

    function abrirAgenda() {
        divAgenda.innerHTML = '';
        const p = document.createElement('p');
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fechaActual = diaSelect.toLocaleDateString("es-ES", opcionesFecha);
        const fechaPrimeraMayus = primeraMayus(fechaActual);
        p.textContent = fechaPrimeraMayus;
        divAgenda.appendChild(p);
        const ul = document.createElement('ul');
        divAgenda.appendChild(ul);

        for (let i = 0; i < agenda.length; i++) {
            const milisecEvent = agenda[i][0].getTime();
            const milisecDiaSelect = diaSelect.getTime();

            if (milisecEvent === milisecDiaSelect) {
                const li = document.createElement('li');
                ul.appendChild(li);
                li.textContent = agenda[i][1];
            }
        }

        divAgenda.appendChild(form);

        containerAgenda.classList.remove('containerNone')
        containerAgenda.setAttribute('id', 'containerAgenda')
        form.innerHTML = '';
    }

    function primeraMayus(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function openForm(form) {
        form.innerHTML = '';
        const textarea = document.createElement('textarea');
        textarea.setAttribute('placeholder', 'Nuevo evento');
        form.appendChild(textarea);
        const newEvent = document.createElement('button');
        newEvent.innerText = 'Nuevo Evento';
        newEvent.classList.add('button');
        newEvent.addEventListener('click', (e) => {
            e.preventDefault();
            crearEvento(textarea.value);
            abrirAgenda();
            calendar();
        });
        form.appendChild(newEvent);
    }

    function crearEvento(str) {
        const evento = [diaSelect, str];
        agenda.push(evento);
    }

    function getNumSemanaMes(d) {
        const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
        return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
    }

    function getUltimoDiaMes(anno, mes) { return new Date(anno, mes, 0); }
    function getNumSemanasMes(anno, mes) {
        const ultimoDiaMes = getUltimoDiaMes(anno, mes);
        const numSemanasMes = getNumSemanaMes(ultimoDiaMes);
        return numSemanasMes;
    }

    //https://dirask.com/posts/JavaScript-check-if-any-text-on-web-page-is-selected-with-caret-j8VwmD
    function isTextSelected() {
        var selection = window.getSelection();
        return selection && selection.type === 'Range';
    }

}