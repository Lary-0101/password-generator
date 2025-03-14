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
    passwordText.style.display = "block"; // Se asigură că parola apare
}
