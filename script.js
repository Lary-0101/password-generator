function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    let charset = "";
    if (document.getElementById('includeLowercase').checked) charset += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById('includeUppercase').checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById('includeNumbers').checked) charset += "0123456789";
    if (document.getElementById('includeSymbols').checked) charset += "!@#$%^&*()+-=";

    if (!charset.length) {
        alert("Selectează cel puțin un tip de caracter!");
        return;
    }

    let password = "";
    let usedChars = new Set();
    while (password.length < length) {
        let randomChar = charset.charAt(Math.floor(Math.random() * charset.length));
        if (!document.getElementById('excludeDuplicates').checked || !usedChars.has(randomChar)) {
            password += randomChar;
            usedChars.add(randomChar);
        }
    }
    document.getElementById('passwordText').textContent = password;
}

function copyPassword() {
    navigator.clipboard.writeText(document.getElementById('passwordText').textContent)
        .then(() => alert("Parola copiată cu succes!"));
}

function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    document.getElementById("modeToggle").innerHTML = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}

window.onload = function() {
    if (localStorage.getItem("darkMode") === "light") {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        document.getElementById("modeToggle").innerHTML = "☀️";
    }
};
