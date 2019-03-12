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

function make_base_auth(user, password) {
    let token = user + ":" + password;
    let hash = btoa(token);
    return "Basic " + hash;
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

function login() {
    let url = "https://e-services-backend.herokuapp.com/v1/me";
    let username = document.getElementsByName("username")[0].value;
    let password = document.getElementsByName("password")[0].value;
    let headers = new Headers();
    headers.append("Authorization", make_base_auth(username, password));

    fetch(url, {
        method: "GET",
        headers: headers,
    }).then(handleErrors)
        .then(response => {
            console.log("ok");
            console.log(response);
            //console.log(getJSessionId());
            sessionStorage.setItem("session", document.getElementsByName("username")[0].value);
            console.log('session ' + sessionStorage.getItem('session'));
            window.location.href = "profilePage.html"
        })
        .catch(error => {
            console.log(error);
            document.getElementsByClassName("input-form__error-message")[0].innerHTML = "Incorrect Username or Password";
            let loginForm = document.getElementsByClassName('input-form')[0];
            loginForm.reset();
        })
}

function register() {
    let url = "https://e-services-backend.herokuapp.com/v1/register";
    let login = document.getElementsByName("login")[0].value;
    let password = document.getElementsByName("password")[0].value;
    let passwordRepeat = document.getElementsByName("passwordRepeat")[0].value;
    let name = document.getElementsByName("name")[0].value;

    let headers = new Headers();
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");

    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "username": login,
            "password": password,
            "passwordConfirmation": passwordRepeat,
            "name": name
        })
    }).then(handleErrors)
        .then(response => {
            console.log("ok");
            console.log(response);
            document.getElementsByClassName("input-form__error-message")[0].innerHTML = "";
            window.location.href = "profilePage.html"
        })
        .catch(error => {
            console.log(error);
            document.getElementsByClassName("input-form__error-message")[0].innerHTML = "Incorrect input data";
            let registerForm = document.getElementsByClassName('input-form')[0];
            registerForm.reset();
        })

}
function returnToIndex() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
