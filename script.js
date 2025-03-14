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
        alert("Parola copiată în clipboard!");
    }).catch(err => {
        console.error("Eroare la copiere: ", err);
    });
}

function savePassword() {
    const password = document.getElementById('passwordText').textContent;
    if (!password || password === "Click pentru a copia") {
        alert("Generează mai întâi o parolă!");
        return;
    }

    const passwordList = document.getElementById('passwordList');
    const li = document.createElement('li');
    li.textContent = password;

    // Buton de copiere pentru fiecare parolă salvată
    const copyBtn = document.createElement('button');
    copyBtn.textContent = "📋";
    copyBtn.classList.add('copy-btn');
    copyBtn.onclick = function () {
        navigator.clipboard.writeText(password).then(() => {
            alert("Parola copiată din lista salvărilor!");
        });
    };

    li.appendChild(copyBtn);
    passwordList.appendChild(li);
}
