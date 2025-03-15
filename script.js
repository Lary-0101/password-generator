document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("modeToggle").addEventListener("click", toggleDarkMode);
});

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    let charset = "";

    if (document.getElementById('includeLowercase').checked) charset += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById('includeUppercase').checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById('includeNumbers').checked) charset += "0123456789";
    if (document.getElementById('includeSymbols').checked) charset += "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    if (charset === "") {
        alert("Selectează cel puțin o categorie de caractere!");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    document.getElementById('passwordText').textContent = password;
}

function copyPassword() {
    const password = document.getElementById('passwordText').textContent;
    if (!password || password === "Click pentru a copia") {
        alert("Nu există nicio parolă de copiat!");
        return;
    }

    navigator.clipboard.writeText(password);
    alert("Parola copiată în clipboard!");
}

function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    let modeIcon = document.getElementById("modeToggle");
    modeIcon.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}
