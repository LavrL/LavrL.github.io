function readInputValues(event) {
    event.preventDefault();
    const user = document.getElementById("usernameInput");
    const pass = document.getElementById("passwordInput");
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
    const url = "https://e-services-backend.herokuapp.com/v1/me";
    const username = document.getElementsByName("username")[0].value;
    const password = document.getElementsByName("password")[0].value;
    let headers = new Headers();
    headers.append("Authorization", make_base_auth(username, password));
    headers.append("Content-Type", "application/json");

    fetch(url, {
        method: "GET",
        headers: headers,
    }).then(handleErrors)
        .then(response => {
            console.log("ok");
            response.json().then((data) => {
                sessionStorage.setItem("name", document.getElementsByName("username")[0].value);
                sessionStorage.setItem("password", document.getElementsByName("password")[0].value)
                sessionStorage.setItem("userID", data.content.id)
            })

            sessionStorage.setItem("session", document.getElementsByName("username")[0].value);

            console.log('session ' + sessionStorage.getItem('session'));
            console.log('session name ' + sessionStorage.getItem('name'))
            console.log('userID ' + sessionStorage.getItem('userID'))

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
    const url = "https://e-services-backend.herokuapp.com/v1/register";
    const login = document.getElementsByName("login")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const passwordRepeat = document.getElementsByName("passwordRepeat")[0].value;
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
            window.location.href = "index.html"
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

function saveCredentials() {
    document.getElementsByClassName("menuBar__credentialsSave_black")[0].innerHTML = "Data was updated";
}

function fetchUserAddreses() {
    const url = "https://e-services-backend.herokuapp.com/v1/me/properties";
    let username = sessionStorage.getItem('name');
    let password = sessionStorage.getItem('password');
    console.log('username ' + username + ' password ' + password)
    var userAddreses = [];
    let headers = new Headers();
    headers.append("Authorization", make_base_auth(username, password));
    headers.append("Content-Type", "application/json");

    fetch(url, {
        method: "GET",
        headers: headers,
    }).then(handleErrors)
        .then(response => {
            console.log("ok");
            response.json().then((data) => {
                for (let i = 0; i < data.content.length; i++) {
                    console.log('address - ' + JSON.stringify(data.content[i].address));
                    userAddreses[i] = data.content[i].address
                    sessionStorage.setItem("userAddreses", JSON.stringify(userAddreses));
                }
                var userAddreses1 = JSON.parse(sessionStorage.getItem("userAddreses"));
                if (userAddreses1 != null) {
                    for (let i = 0; i < userAddreses1.length; i++) {
                        const todoItem = createTodoItem(userAddreses1[i]);
                        todoList.appendChild(todoItem);
                    }
                }
                console.log(JSON.parse(sessionStorage.getItem('userAddreses')))
            })
        })
        .catch(error => {
            console.log(error);
        })
}

function addUserAddress() {
    let url = "https://e-services-backend.herokuapp.com/v1/me/properties";
    let username = sessionStorage.getItem('name');
    let password = sessionStorage.getItem('password');
    let headers = new Headers();

    headers.append("Authorization", make_base_auth(username, password));
    headers.append("Content-Type", "application/json");

    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "address": addInput.value,
            "user_id": sessionStorage.getItem('userID')
        })
    }).then(handleErrors)
        .then(response => {
            console.log("ok");
            response.json().then((data) => {
                console.log(JSON.parse(sessionStorage.getItem('userAddreses')))
            })
        })
        .catch(error => {
            console.log(error);
        })
}

function deleteUserAddress(addressToDelete) {
    const url = "https://e-services-backend.herokuapp.com/v1/me/properties/" + addressToDelete;
    let username = sessionStorage.getItem('name');
    let password = sessionStorage.getItem('password');
    let headers = new Headers();

    headers.append("Authorization", make_base_auth(username, password));
    headers.append("Content-Type", "application/json");

    fetch(url, {
        method: "DELETE",
        headers: headers,

    }).then(handleErrors)
        .then(response => {
            console.log("ok");
            response.json().then((data) => {
            })
        })
        .catch(error => {
            console.log(error);
        })
}

function editUserAddress(oldAddress, newAddress) {
    const url = "https://e-services-backend.herokuapp.com/v1/me/properties/" + newAddress;
    const username = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    let headers = new Headers();

    headers.append("Authorization", make_base_auth(username, password));
    headers.append("Content-Type", "application/json");

    console.log('oldAddress -  ' + oldAddress)

    fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
            "oldAddress": oldAddress,
            "user_id": sessionStorage.getItem('userID')
        })
    }).then(handleErrors)
        .then(response => {
            console.log("ok");
            response.json().then((data) => {
            })
        })
        .catch(error => {
            console.log(error);
        })
}

function sessionCheck() {
    if (sessionStorage.getItem('session') == null)
        window.history.back();
}