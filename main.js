// Validation for username
const unameInput = document.getElementById('uname');
unameInput.addEventListener('keyup', showUnameWarning);
function showUnameWarning () {
    let input = unameInput.value;
    if (input.includes('@')) {
        document.getElementById('unameWarning').innerText = 'Gebruikersnaam mag geen @ gebruiken!';
    }
    else {
        document.getElementById('unameWarning').innerText = '';
    }
}

//Validation for password
const pswInput = document.getElementById('psw');
pswInput.addEventListener('keyup', showPswWarning);
function showPswWarning() {
    let input = pswInput.value;
    if (input.length <= 6 && input.length > 0) {
        document.getElementById('pswWarning').innerText = 'Wachtwoord is te kort, gebruik minimaal 6 tekes';
    }
    else {
        document.getElementById('pswWarning').innerText = '';
    }
}
