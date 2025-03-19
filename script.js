const backendURL = "https://safekeys-backend.onrender.com"; // Asigură-te că acesta e corect!

document.getElementById("generate").addEventListener("click", async function () {
    const length = document.getElementById("length").value;
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;
    const noSimilar = document.getElementById("no-similar").checked;
    const spaces = document.getElementById("spaces").checked;
    const readable = document.getElementById("readable").checked;
    const easyType = document.getElementById("easy-type").checked;

    try {
        console.log("🔄 Trimit cererea către backend...");

        const response = await fetch(`${backendURL}/generate-password`, {  // Trebuie să fie `/generate-password`
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
