const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("✅ Backend-ul SafeKeys funcționează!");
});

app.get("/generate-password", (req, res) => {
    const length = 12;
    const options = {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true,
        noSimilar: false,
        spaces: false,
        readable: false,
        easyType: false
    };

    const password = generatePassword({ ...options, length });
    res.json({ password });
});

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
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    res.json({ password: password.trim() });
});

// Pornim serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
