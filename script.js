function generatePassword() {
    const length = document.getElementById('length').value;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const excludeDuplicates = document.getElementById('excludeDuplicates').checked;
    const excludeSimilar = document.getElementById('excludeSimilar').checked;

    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()+";

    if (excludeSimilar) {
        charset = charset.replace(/[iIlLoO0]/g, '');
    }

    let password = "";
    const usedChars = new Set();

    for (let i = 0; i < length; i++) {
        let randomChar;
        do {
            randomChar = charset.charAt(Math.floor(Math.random() * charset.length));
        } while (excludeDuplicates && usedChars.has(randomChar));

        password += randomChar;
        usedChars.add(randomChar);
    }

    document.getElementById('passwordText').textContent = password;
}

function copyPassword() {
    const password = document.getElementById('passwordText').textContent;
    navigator.clipboard.writeText(password).then(() => {
        showNotification("Parola a fost copiată în clipboard!");
    }).catch(err => {
        console.error("Eroare la copiere: ", err);
    });
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    let modeIcon = document.getElementById("modeToggle");
    modeIcon.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}
