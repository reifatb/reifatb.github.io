window.addEventListener('DOMContentLoaded', () => {
    const cookiesBanner = document.getElementById('cookiesBanner');
    const noCookieButton = document.getElementById('noCookieButton');
    const yesCookieButton = document.getElementById('yesCookieButton');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const telephone = document.getElementById('telephone');
    const dni = document.getElementById('dni');
    const send = document.getElementById('send');
    const regexPasswordLength = /.{8}/;
    const regexPasswordBlanck = /\S/;
    const regexTel = /\d{9}/;
    const regexDni = /\d{8}[a-zA-Z]/;

    let cookiesAcceptance;
    let validatedPassword = false;
    let validatedTel = false;
    let validatedDni = false;


    if (localStorage.getItem('cookie') === 'true') {
        cookiesBanner.style.display = 'none';
    }

    function createCookie() {
        if (localStorage !== undefined) {
            localStorage.setItem('cookie', cookiesAcceptance);
        }
    }

    function validatePassword() {
        const validated = regexPasswordLength.test(password.value) && regexPasswordBlanck.test(password.value) && password.value === password2.value;

        validatedPassword = validated;
    }

    function validateTel() {
        const validated = regexTel.test(telephone.value);

        validatedTel = validated;
    }

    function validateDNI() {
        const numbers = parseInt(dni.value.substring(0, 8));
        const dniLetter = dni.value.substring(8).toUpperCase();
        const remainder = numbers % 23;
        let letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letter = letter.substring(remainder, remainder + 1)

        validatedDni = regexDni.test(dni.value) && dniLetter === letter
    }

    function validateForm() {
        validatePassword();
        validateTel();
        validateDNI();
        return validatedPassword && validatedTel && validatedDni;
    }



    noCookieButton.addEventListener('click', e => {
        e.preventDefault();
        cookiesAcceptance = 'false';
        createCookie();
        cookiesBanner.style.display = 'none';
    });

    yesCookieButton.addEventListener('click', e => {
        e.preventDefault();
        cookiesAcceptance = 'true';
        createCookie();
        cookiesBanner.style.display = 'none';
    });

    send.addEventListener('click', e => {
        e.preventDefault();
        if (validateForm()) {
            const wind0w = window.open();
            const labels = document.querySelectorAll('label input');

            for (const input of labels) {
                const p = wind0w.document.createElement('p');
                p.innerText = input.value;
                wind0w.document.body.appendChild(p);
            }
        }
    });


});