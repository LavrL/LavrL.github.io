const backendURL = "https://e-services-backend.herokuapp.com/v1/"

const readInputValues = (event) => {
    event.preventDefault();
    const user = document.getElementById("usernameInput");
    const pass = document.getElementById("passwordInput");
    console.log('Username - ' + user.value + ' , Password - ' + pass.value);
    window.location.href = 'mainMenuProperties.html';
}
const openNav= () => {
    document.getElementById("myNav").style.width = "100%";
}
const closeNav= () => {
    document.getElementById("myNav").style.width = "0%";
}

const make_base_auth = (user, password) => {
    const token = user + ":" + password;
    const hash = btoa(token);
    return "Basic " + hash;
}

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

const login = () => {
    const url = backendURL + "me";
    const username = document.getElementsByName("username")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const headers = new Headers();
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
            const loginForm = document.getElementsByClassName('input-form')[0];
            loginForm.reset();
        })
}

const register = () => {
    const url = backendURL + "register";
    const login = document.getElementsByName("login")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const passwordRepeat = document.getElementsByName("passwordRepeat")[0].value;
    const name = document.getElementsByName("name")[0].value;

    const headers = new Headers();
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
            const registerForm = document.getElementsByClassName('input-form')[0];
            registerForm.reset();
        })
}

const returnToIndex = () => {
    sessionStorage.clear();
    window.location.href = "index.html";
}

const saveCredentials = () => {
    document.getElementsByClassName("menuBar__credentialsSave_black")[0].innerHTML = "Data was updated";
}

const fetchUserAddreses = () => {
    const url = backendURL + "me/properties";
    const username = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    console.log('username ' + username + ' password ' + password)
    const userAddreses = [];
    const headers = new Headers();
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

const addUserAddress = () => {
    const url = backendURL + "me/properties" 
    const username = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    const headers = new Headers();

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

const deleteUserAddress = (addressToDelete) => {
    const url = backendURL + "me/properties/" + addressToDelete;
    const username = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    const headers = new Headers();

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

const editUserAddress = (oldAddress, newAddress) => {
    const url = backendURL + "me/properties/" + newAddress;
    const username = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    const headers = new Headers();

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

const sessionCheck = () => {
    if (sessionStorage.getItem('session') == null)
        window.history.back();
}