function generatePassword(length = 25) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    while (password.length < length) {
        let char = chars[Math.floor(Math.random() * chars.length)];
        if (!password.includes(char)) {
            password += char;
        }
    }
    return password;
}

document.getElementById("generate").addEventListener("click", () => {
    document.getElementById("password").innerText = generatePassword();
});
