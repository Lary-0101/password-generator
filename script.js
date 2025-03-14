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
        alert("Selectează cel puțin un tip de caracter!");
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

    document.getElementById('passwordText').textContent = password;
    showNotification("✅ Parola generată cu succes!");
}

function copyPassword() {
    const passwordText = document.getElementById('passwordText').textContent;
    if (!passwordText || passwordText === "Parola generată va apărea aici") {
        alert("Nu există nicio parolă de copiat! Generați una mai întâi.");
        return;
    }
    navigator.clipboard.writeText(passwordText).then(() => {
        showNotification("✅ Parola copiată cu succes!");
    }).catch(err => {
        console.error("Eroare copiere: ", err);
    });
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification show";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    let modeIcon = document.getElementById("modeToggle");
    if (document.body.classList.contains("light-mode")) {
        modeIcon.innerHTML = "☀️";
    } else {
        modeIcon.innerHTML = "🌙";
    }
}

function changeLanguage() {
    const lang = document.getElementById("languageSelector").value;
    const translations = {
        ro: { generate: "Generează Parolă", copy: "Copiază", length: "Lungimea parolei:", security: "Importanța parolelor securizate", about: "Despre SafeKeys" },
        en: { generate: "Generate Password", copy: "Copy", length: "Password length:", security: "Why Secure Passwords Matter", about: "About SafeKeys" }
    };
    document.querySelector("button[onclick='generatePassword()']").textContent = translations[lang].generate;
    document.querySelector("button[onclick='copyPassword()']").textContent = translations[lang].copy;
    document.querySelector("label[for='length']").textContent = translations[lang].length;
    document.getElementById("security").querySelector("h2").textContent = translations[lang].security;
    document.getElementById("about").querySelector("h2").textContent = translations[lang].about;
}

// Adăugare GIF-uri dinamice în pagină
window.onload = function() {
    document.getElementById("securityGif").src = "https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif";
    document.getElementById("aboutGif").src = "https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif";
};
