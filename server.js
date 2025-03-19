const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

function generatePassword(options) {
    let chars = "";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";

    if (options.noSimilar) chars = chars.replace(/[oO0l1]/g, "");
    if (options.easyType) chars = chars.replace(/[!@#$%^&*()]/g, "");

    if (!chars.length) return "⚠️ Selectează cel puțin un set de caractere!";

    let password = "";
    let usedChars = new Set(); // Evităm repetarea caracterelor identice

    for (let i = 0; i < options.length; i++) {
        let char;
        do {
            char = chars[Math.floor(Math.random() * chars.length)];
        } while (usedChars.has(char)); // Asigurăm diversitatea caracterelor

        usedChars.add(char);
        password += char;

        if (options.spaces && i % 5 === 4 && i !== options.length - 1) password += " ";
    }

    return password.trim(); // Eliminăm spațiul de la final, dacă există
}

app.post("/generate-password", (req, res) => {
    let { length } = req.body;

    // Verificăm dacă `length` este un număr valid
    length = parseInt(length, 10);
    if (isNaN(length) || length < 6 || length > 25) {
        return res.status(400).json({ error: "⚠️ Lungimea parolei trebuie să fie între 6 și 25 de caractere!" });
    }

    const password = generatePassword({ ...req.body, length });
    res.json({ password });
});

// Portul pe care rulează serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
