function generatePassword() {
    const length = document.getElementById('length').value;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()+";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('passwordText').textContent = password;
}

function copyPassword() {
    const passwordText = document.getElementById('passwordText').textContent;
    navigator.clipboard.writeText(passwordText).then(() => {
        alert("Parola copiată cu succes!");
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "dark" : "light");
    document.getElementById("modeToggle").innerHTML = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}

window.onload = function() {
    if (localStorage.getItem("darkMode") === "light") {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        document.getElementById("modeToggle").innerHTML = "☀️";
    }
};

function changeLanguage() {
    const lang = document.getElementById("languageSelector").value;
    const translations = {
        ro: { generate: "Generează Parolă", copy: "Copiază", length: "Lungimea parolei:", security: "Importanța parolelor securizate", about: "Despre SafeKeys" },
        en: { generate: "Generate Password", copy: "Copy", length: "Password length:", security: "Why Secure Passwords Matter", about: "About SafeKeys" }
    };
    document.querySelector("button[onclick='generatePassword()']").textContent = translations[lang].generate;
    document.querySelector("button[onclick='copyPassword()']").textContent = translations[lang].copy;
    document.querySelector("label[for='length']").textContent = translations[lang].length;
    localStorage.setItem("language", lang);
}

window.onload = function() {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
        document.getElementById("languageSelector").value = savedLang;
        changeLanguage();
    }

    if (localStorage.getItem("darkMode") === "light") {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        document.getElementById("modeToggle").innerHTML = "☀️";
    }
};
