window.onload = function () {
    const button1 = document.getElementById('button1');
    const textarea = document.getElementById('textarea');
    const events = ['mousedown', 'mouseup', 'click', 'contextmenu', 'dblclick', 'mouseover'];

    addEvents();

    function writeTextarea(element) {
        textarea.value += `${element}\n`;
    }

    //caso 1
    // function addEvents() {
    //     for (element of events) {
    //         button1.addEventListener(element, () => { writeTextarea(element) });
    //         console.log(element);
    //     }
    // }


    //caso 2
    // function addEvents() {
    //     for (let i = 0; i < events.length; i++) {
    //         button1.addEventListener(events[i], () => { writeTextarea(events[i]) });
    //         console.log(events[i]);
    //     }
    // }


    //caso 3
    events.forEach(e => button1.addEventListener(e, () => { writeTextarea(e) }))

}