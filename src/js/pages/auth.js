let inputPassword = document.querySelector('.input.password');
let visibilityIcon = document.querySelector('.auth__visibility-pass');
visibilityIcon.addEventListener('click', function() {
    inputPassword.getAttribute('type') === 'password' ? inputPassword.setAttribute('type', 'text') : inputPassword.setAttribute('type', 'password');
});
