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
