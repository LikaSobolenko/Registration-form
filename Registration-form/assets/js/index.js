const firstName = document.getElementById("first-name");
const secondName = document.getElementById("second-name");
const email = document.getElementById("email");
const date = document.getElementById("date");
const password = document.getElementById("password");
const passwordChecked = document.getElementById("password-checked");
const button = document.getElementById("button");
let valid = [false, false, false, false, false, false];

firstName.addEventListener("change", ValidationFirstName);
secondName.addEventListener("change", ValidationSecondName);
email.addEventListener("change", ValidationEmail);
date.addEventListener("change", ValidationDate);
password.addEventListener("change", () => {
    ValidationPassword();
    ValidationPasswordChecked();
});
passwordChecked.addEventListener("input", ValidationPasswordChecked);

function ValidationFirstName() {
    let firstNameErrors = [];
    valid[0] = true;
    if (/^[А-Я][а-яё]*$/.test(firstName.value)) {
        firstNameErrors = [];
    } else {
        firstNameErrors.push(
            `Введите ваше имя на русском языке с заглавной буквы`
        );
        valid[0] = false;
    }
    if (firstName.value.length <= 10) {
    } else {
        firstNameErrors.push(`Ваше имя должно быть короче 10 букв`);
        valid[0] = false;
    }
    if (valid[0]) {
        firstName.classList.remove("invalid");
    } else {
        firstName.classList.add("invalid");
    }

    document.getElementById("first-name-errors").innerHTML =
        firstNameErrors.join(". <br />");
}

function ValidationSecondName() {
    let secondNameErrors = [];
    valid[1] = true;
    if (/^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)*$/.test(secondName.value)) {
        secondNameErrors = [];
    } else {
        secondNameErrors.push(
            `Введите вашу фамилию на русском языке с заглавной буквы`
        );
        valid[1] = false;
    }
    if (secondName.value.length <= 25) {
        errors = [];
    } else {
        secondName.push(`Ваша фамилия должна быть короче 25 букв`);
        valid[1] = false;
    }

    if (valid[1]) {
        secondName.classList.remove("invalid");
    } else {
        secondName.classList.add("invalid");
    }
    document.getElementById("second-name-errors").innerHTML =
        secondNameErrors.join(". <br />");
}

function ValidationEmail() {
    let emailErrors = document.getElementById("email-errors");
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        emailErrors.innerHTML = "";
        email.classList.remove("invalid");
        valid[2] = true;
    } else {
        emailErrors.innerHTML =
            "Неверный формат email-адреса. <br/>Пример: MyName@mail.ru";
        email.classList.add("invalid");
        valid[2] = false;
    }
}

function ValidationDate() {
    let now = new Date();
    let userDate = new Date(date.value);
    let age = now.getFullYear() - userDate.getFullYear();
    let userDatenow = new Date(
        now.getFullYear(),
        userDate.getMonth(),
        userDate.getDate()
    );
    if (now < userDatenow) {
        age -= 1;
    }
    if (now <= userDate) {
        document.getElementById("date-errors").innerHTML = "Вы из будущего?";
        valid[3] = false;
    } else {
        if (age < 18) {
            document.getElementById("date-errors").innerHTML =
                "Вам ещё не испольнилось 18 лет";
            valid[3] = false;
        } else {
            document.getElementById("date-errors").innerHTML = "";
            valid[3] = true;
        }
    }

    if (valid[3]) {
        date.classList.remove("invalid");
    } else {
        date.classList.add("invalid");
    }
}

function ValidationPassword() {
    let passwordErrors = [];
    valid[4] = true;
    if (!/.*\d+.*/.test(password.value)) {
        valid[4] = false;
        passwordErrors.push("В пароле должна быть хотя бы одна цифра 0-9");
    }
    if (!/.*[a-z]+.*/.test(password.value)) {
        valid[4] = false;
        passwordErrors.push("В пароле должна быть хотя бы одна строчная буква");
    }
    if (!/.*[A-Z]+.*/.test(password.value)) {
        valid[4] = false;
        passwordErrors.push(
            "В пароле должен быть хотя бы одна заглавная буква"
        );
    }
    if (!/^.{8,}$/.test(password.value)) {
        valid[4] = false;
        passwordErrors.push("Длина пароля должна быть минимум 8 символов");
    }
    if (!/^(?=.*[!@#$%^&*()_+]).*$/.test(password.value)) {
        valid[4] = false;
        passwordErrors.push(
            "В пароле должен быть хотя бы один символ: !@#$%^&*()_+"
        );
    }

    if (valid[4]) {
        password.classList.remove("invalid");
    } else {
        password.classList.add("invalid");
    }

    document.getElementById("password-errors").innerHTML =
        passwordErrors.join(". <br />");
}

function ValidationPasswordChecked() {
    if (password.value === passwordChecked.value) {
        valid[5] = true;
        passwordChecked.classList.remove("invalid");
        password.classList.remove("invalid");
        document.getElementById("password-checked-errors").innerHTML = "";
    } else {
        passwordChecked.classList.add("invalid");
        document.getElementById("password-checked-errors").innerHTML =
            "Пароли не совпадают";
        valid[5] = false;
    }
}

const inputs = document.getElementsByTagName("input");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", Validation);
}

function Validation() {
    console.log(valid);
    foundfalse = true;
    for (let val of valid) {
        if (!val) {
            foundfalse = false;
            break;
        }
    }
    console.log(foundfalse);
    if (foundfalse) {
        button.disabled = false;
    }
}
