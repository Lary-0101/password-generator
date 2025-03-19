function generatePassword() {
    const length = document.getElementById("length").value;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersChars = "0123456789";
    const symbolsChars = "!@#$%^&*()";

    let availableChars = lowercaseChars;
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeNumbers) availableChars += numbersChars;
    if (includeSymbols) availableChars += symbolsChars;

    let password = "";
    while (password.length < length) {
        let char = availableChars[Math.floor(Math.random() * availableChars.length)];
        if (!password.includes(char)) {
            password += char;
        }
    }

    document.getElementById("password").value = password;
}

// Funcția pentru copierea parolei
document.getElementById("copy").addEventListener("click", function() {
    let passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Parola copiată!");
});

// Eveniment pentru generarea parolei
document.getElementById("generate").addEventListener("click", generatePassword);
