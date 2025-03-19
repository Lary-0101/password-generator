const backendURL = "https://safekeys-backend.onrender.com"; // Pune URL-ul backend-ului tău

document.getElementById("generate").addEventListener("click", async function() {
    const length = document.getElementById("length").value;
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    const response = await fetch(`${backendURL}/generate-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ length, uppercase, lowercase, numbers, symbols })
    });

    const data = await response.json();
    document.getElementById("password").value = data.password;
});
