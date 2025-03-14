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

    if (charset.length === 0) {
        alert("Please select at least one character type!");
        return;
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

    const passwordText = document.getElementById('passwordText');
    passwordText.textContent = password;
    passwordText.style.display = "block"; // Asigură că parola este vizibilă
}

/* Funcția pentru copierea parolei */
function copyPassword() {
    const passwordText = document.getElementById('passwordText').textContent.trim();

    if (!passwordText || passwordText === "Generated password will appear here") {
        alert("No password to copy! Generate one first.");
        return;
    }

    navigator.clipboard.writeText(passwordText).then(() => {
        showNotification("Password copied successfully!");
    }).catch(err => {
        console.error("Copy error: ", err);
    });
}

/* Funcția pentru afișarea notificării */
function showNotification(message) {
    const notification = document.getElementById("notification");

    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

/* Funcția pentru schimbarea modului întunecat/luminos */
function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    
    let modeIcon = document.getElementById("modeToggle");
    if (document.body.classList.contains("light-mode")) {
        modeIcon.innerHTML = "☀️"; // Soare pentru modul luminos
    } else {
        modeIcon.innerHTML = "🌙"; // Lună pentru modul întunecat
    }
}
