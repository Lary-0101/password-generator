const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

function generatePassword(options) {
    const chars = {
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "0123456789",
        symbols: "!@#$%^&*()"
    };

    let availableChars = "";
    if (options.lowercase) availableChars += chars.lowercase;
    if (options.uppercase) availableChars += chars.uppercase;
    if (options.numbers) availableChars += chars.numbers;
    if (options.symbols) availableChars += chars.symbols;

    let password = "";
    for (let i = 0; i < options.length; i++) {
        password += availableChars[Math.floor(Math.random() * availableChars.length)];
    }

    return password;
}

app.post("/generate-password", (req, res) => {
    const password = generatePassword(req.body);
    res.json({ password });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
