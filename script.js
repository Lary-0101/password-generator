const SAFE_LETTERS_LOWER = "abcdefghijkmnpqrstuvwxyz";
const SAFE_LETTERS_UPPER = "ABCDEFGHJKMNPQRSTUVWXYZ";
const SAFE_NUMBERS = "234679";
const SAFE_SYMBOLS = "!@#";

function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const options = {
    uppercase: document.getElementById('uppercase').checked,
    lowercase: document.getElementById('lowercase').checked,
    numbers: document.getElementById('numbers').checked,
    symbols: document.getElementById('symbols').checked,
    noSimilar: document.getElementById('avoid-similar').checked,
    readable: document.getElementById('easy-read').checked,
    easyType: document.getElementById('easy-type').checked,
    length
  };

  const password = generateLocalPassword(options);
  document.getElementById('password').value = password;
  document.getElementById('copy-btn').style.display = "none";
  document.getElementById('message').style.display = "none";

  // ✅ Setează parola generată în window.generatedPassword doar dacă este validă
  if (!password.startsWith("⚠️")) {
    window.generatedPassword = password;
  } else {
    window.generatedPassword = null;  // Dacă apare o eroare, nu setăm parola
  }
}

function generateLocalPassword(options) {
  let chars = "";

  if (options.readable || options.easyType) {
    if (options.lowercase) chars += SAFE_LETTERS_LOWER;
    if (options.uppercase) chars += SAFE_LETTERS_UPPER;
    if (options.numbers) chars += SAFE_NUMBERS;
    if (options.symbols && !options.easyType) chars += SAFE_SYMBOLS;
  } else {
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";
  }

  if (!chars.length) return "⚠️ Selectează cel puțin un set de caractere!";

  chars = [...new Set(chars)].join('');

  if (options.length > chars.length) {
    return `⚠️ Poți genera maxim ${chars.length} caractere fără duplicate.`;
  }

  let available = chars.split('');
  let password = "";
  for (let i = 0; i < options.length; i++) {
    const index = Math.floor(Math.random() * available.length);
    password += available[index];
    available.splice(index, 1);
  }

  return password.trim();
}

// 🔽 Slider pentru afișarea numărului de caractere
function setupLengthSlider() {
  const lengthInput = document.getElementById('length');
  const lengthValue = document.getElementById('length-value');
  if (lengthInput && lengthValue) {
    // Setează valoarea inițială
    lengthValue.textContent = lengthInput.value;

    // Ascultă modificările slider-ului
    lengthInput.addEventListener('input', () => {
      lengthValue.textContent = lengthInput.value;  // Actualizează valoarea din span
    });
  }
}

// 💾 Salvează parola într-un fișier .txt
function savePassword() {
  if (!window.generatedPassword) {
    alert("Trebuie generată o parolă validă mai întâi!");
    return;
  }

  const blob = new Blob([window.generatedPassword], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "parola_mea.txt";
  a.click();
  URL.revokeObjectURL(url);

  document.getElementById('message').style.display = "block";
}

window.onload = () => {
  document.getElementById('password').value = '';
  document.getElementById('copy-btn').style.display = "none";
  document.getElementById('message').style.display = "none";
  setupLengthSlider();
};
