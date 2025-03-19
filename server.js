const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("✅ Backend-ul SafeKeys funcționează!");
});

app.get("/generate-password", (req, res) => {
    const length = parseInt(req.query.length) || 12;

    const options = {
        lowercase: req.query.lowercase === 'true',
        uppercase: req.query.uppercase === 'true',
        numbers: req.query.numbers === 'true',
        symbols: req.query.symbols === 'true',
        noSimilar: req.query.noSimilar === 'true',
        readable: req.query.easyRead === 'true',
        easyType: req.query.easyType === 'true'
    };

    const password = generatePassword({ ...options, length });
    res.json({ password: password.trim() });
});

function generatePassword(options) {
    let chars = "";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";

    if (options.noSimilar || options.readable) chars = chars.replace(/[oO0l1]/g, "");
    if (options.easyType) chars = chars.replace(/[!@#$%^&*()]/g, "");

    if (!chars.length) return "⚠️ Selectează cel puțin un set de caractere!";

    let password = "";
    for (let i = 0; i < options.length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password.trim();
}

// Pornim serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
