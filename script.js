const backendURL = "https://safekeys-backend.onrender.com"; // Asigură-te că acesta e corect!

document.getElementById("generate").addEventListener("click", function () {
    generatePassword();
});

document.getElementById("copy").addEventListener("click", function () {
    copyPassword();
});

function generatePassword() {
    const length = parseInt(document.getElementById("length").value);
    let charset = "";

    if (document.getElementById("lowercase").checked) charset += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("uppercase").checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("numbers").checked) charset += "0123456789";
    if (document.getElementById("symbols").checked) charset += "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    // Evităm caracterele similare
    if (document.getElementById("no-similar").checked) {
        charset = charset.replace(/[oO0l1]/g, "");
    }

    // Dacă nu e selectată nicio opțiune
    if (charset === "") {
        alert("⚠️ Selectează cel puțin un tip de caractere!");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));

        // Adăugăm spații la fiecare 5 caractere dacă este bifată opțiunea
        if (document.getElementById("spaces").checked && (i + 1) % 5 === 0 && i !== length - 1) {
            password += " ";
        }
    }

    document.getElementById("password").value = password.trim(); // Eliminăm spațiul final, dacă există
}

// Funcție pentru copierea parolei
function copyPassword() {
    let passwordField = document.getElementById("password");

    if (passwordField.value !== "") {
        navigator.clipboard.writeText(passwordField.value)
            .then(() => alert("📋 Parola copiată în clipboard!"))
            .catch((error) => console.error("❌ Eroare la copiere:", error));
    } else {
        alert("⚠️ Nu există nicio parolă de copiat!");
    }
}
