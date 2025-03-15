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
    navigator.clipboard.writeText(password);
    alert("Parola copiată în clipboard!");
}
