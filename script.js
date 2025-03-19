const backendURL = "https://safekeys-backend.onrender.com"; 

document.getElementById("generate").addEventListener("click", async function () {
    const length = parseInt(document.getElementById("length").value, 10);
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;
    const noSimilar = document.getElementById("no-similar").checked;
    const spaces = document.getElementById("spaces").checked;
    const readable = document.getElementById("readable").checked;
    const easyType = document.getElementById("easy-type").checked;

    // Verificăm dacă lungimea este validă
    if (isNaN(length) || length < 6 || length > 25) {
        alert("⚠️ Lungimea parolei trebuie să fie între 6 și 25 de caractere!");
        return;
    }

    try {
        console.log("🔄 Trimit cererea către backend...");

        const response = await fetch(`${backendURL}/generate-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ length, uppercase, lowercase, numbers, symbols, noSimilar, spaces, readable, easyType })
        });

        if (!response.ok) {
            throw new Error(`Eroare server: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("password").value = data.password;
        console.log("✅ Parolă generată:", data.password);
    } catch (error) {
        console.error("❌ Eroare la generarea parolei:", error);
        alert("A apărut o problemă. Verifică conexiunea la server!");
    }
});

// Funcție pentru copierea parolei
document.getElementById("copy").addEventListener("click", function () {
    let passwordField = document.getElementById("password");
    if (passwordField.value !== "") {
        passwordField.select();
        document.execCommand("copy");
        alert("📋 Parola copiată!");
    } else {
        alert("⚠️ Nu există nicio parolă de copiat!");
    }
});
