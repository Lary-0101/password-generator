// Funcție care actualizează valoarea afișată pentru lungimea parolei (slider)
function updateLengthValue() {
  const length = document.getElementById('length').value;
  document.getElementById('length-value').textContent = length;
}

// Funcție pentru generarea parolei
function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const options = {
    uppercase: document.getElementById('uppercase').checked,
    lowercase: document.getElementById('lowercase').checked,
    numbers: document.getElementById('numbers').checked,
    symbols: document.getElementById('symbols').checked,
    readable: document.getElementById('readable').checked,
    easyType: document.getElementById('easy-type').checked,
    avoidSimilar: document.getElementById('avoid-similar').checked,
    length
  };

  // Verifică dacă cel puțin un criteriu a fost selectat
  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
    // Afișează mesajul de avertizare în câmpul parolei
    document.getElementById('password').value = "⚠️ Selectează cel puțin un set de caractere!";
    return; // Ieși din funcție fără a genera parola
  }

  // Dacă criterii sunt selectate, generează parola
  const password = generateLocalPassword(options);

  // Salvează parola reală într-un atribut data-password pentru utilizare ulterioară
  document.getElementById('password').setAttribute("data-password", password);

  // Afișează doar asteriscuri pentru parolă
  document.getElementById('password').value = '***********';
}

// Funcție pentru generarea parolei pe baza opțiunilor selectate
function generateLocalPassword(options) {
  let chars = "";

  if (options.readable || options.easyType) {
    if (options.lowercase) chars += "abcdefghijkmnpqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHJKMNPQRSTUVWXYZ";
    if (options.numbers) chars += "234679";
    if (options.symbols && !options.easyType) chars += "!@#";
  } else {
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";
  }

  if (!chars.length) return "⚠️ Selectează cel puțin un set de caractere!";

  chars = [...new Set(chars)].join('');

  let available = chars.split('');
  let password = "";

  for (let i = 0; i < options.length; i++) {
    const index = Math.floor(Math.random() * available.length);
    password += available[index];
    available.splice(index, 1); // Remove character to avoid repetition
  }

  return password.trim();
}


// Funcție pentru salvarea parolei într-un fișier .txt
function savePassword() {
  const password = document.getElementById('password').getAttribute("data-password"); // Extrage parola reală din data-password
  if (!password) {
    alert("Trebuie generată o parolă validă mai întâi!");
    return;
  }

  const blob = new Blob([password], { type: 'text/plain' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "parola_mea.txt";
  link.click();
}
