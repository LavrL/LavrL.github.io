function readInputValues(event) {
    event.preventDefault();
    let user = document.getElementById("usernameInput");
    let pass = document.getElementById("passwordInput");
    console.log('Username - ' + user.value + ' , Password - ' + pass.value);
    window.location.href = 'mainMenuProperties.html';
}
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}