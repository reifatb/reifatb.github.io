window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const user = document.getElementById('user');
    const password = document.getElementById('password');
    const height = document.getElementById('height');
    const width = document.getElementById('width');
    const submit = document.getElementById('submit');
    const clear = document.getElementById('clear');
    const regexPassword = /\D/;
    const regexWhiteSpace = /\s/;
    let pass = '';

    function validateUser(user) {
        const notNumber = regexPassword.test(user);
        const notBlank = user.trim().length > 0 ? true : false;
        return notNumber && notBlank;
    }

    function validatePassword(password) {
        const whiteSpace = !regexWhiteSpace.test(password);
        const length = password.length > 7;
        let characters = false;
        let upperCase = false;
        let lowerCase = false;
        let number = false;

        for (let char of password) {

            if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
                upperCase = true;
            }

            if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
                lowerCase = true;
            }

            for (let i = 0; i < 10; i++) {
                if (char == i) {
                    number = true;
                }
            }

            if (upperCase && lowerCase && number) {
                characters = true;
            }
        }
        return whiteSpace && length && characters;
    }

    function drawAsterisk() {

    }

    function validateForm(user, password) {
        return validateUser(user) && validatePassword(password);
    }

    function openWindow(height, width) {
        const ventana = window.open("", "", `width=${width},height=${height}`)
    }

    function clearInputs() {
        user.value = '';
        password.value = '';
        width.value = '';
        height.value = '';
        pass = '';
    }


    submit.addEventListener('click', e => {
        e.preventDefault();
        validateForm(user.value, pass) ? openWindow(height.value, width.value) : alert('Datos no válidos');
    });

    clear.addEventListener('click', e => {
        e.preventDefault();
        clearInputs();
    });

    password.addEventListener('keypress', e => {
        e.preventDefault();
        pass += e.key;
        console.log(pass);
        password.value += '*';
    });
});