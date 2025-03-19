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
    
    if (!chars) return "Alege cel puțin un set de caractere!";
    
    let password = "";
    for (let i = 0; i < options.length; i++) {
        let char = chars[Math.floor(Math.random() * chars.length)];
        if (options.spaces && i % 5 === 0 && i !== 0) password += " ";
        password += char;
    }

    return password;
}

app.post("/generate-password", (req, res) => {
    const password = generatePassword(req.body);
    res.json({ password });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
