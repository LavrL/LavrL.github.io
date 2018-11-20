function readInputValues(event) {
    event.preventDefault();
    let user = document.getElementById("username1");
    let pass = document.getElementById("password1");
    console.log('Username - ' + user.value + ' , Password - ' + pass.value);
    window.location.href = 'mainMenuProperties.html';
}