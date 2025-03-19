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
    if (options.symbols) chars += "!@#$%^&*()";

    if (options.noSimilar) chars = chars.replace(/[oO0l1]/g, "");
    if (options.easyType) chars = chars.replace(/[!@#$%^&*()]/g, "");

    if (!chars.length) return "⚠️ Selectează cel puțin un set de caractere!";

    let password = "";
    for (let i = 0; i < options.length; i++) {
        if (options.spaces && i % 5 === 0 && i !== 0) password += " ";
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Evităm să punem spațiu la final
    password = password.trim();

    return password;
}

app.post("/generate-password", (req, res) => {
    const { length } = req.body;

    // Verificăm dacă lungimea este corectă
    if (!length || length < 6 || length > 25) {
        return res.status(400).json({ error: "⚠️ Lungimea parolei trebuie să fie între 6 și 25 de caractere!" });
    }

    const password = generatePassword(req.body);
    res.json({ password });
});

// Portul pe care rulează serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
