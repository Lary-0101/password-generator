const SAFE_LETTERS_LOWER = "abcdefghijkmnpqrstuvwxyz";
const SAFE_LETTERS_UPPER = "ABCDEFGHJKMNPQRSTUVWXYZ";
const SAFE_NUMBERS = "234679";
const SAFE_SYMBOLS = "!@#";

let generatedPassword = null;

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
  document.getElementById('copy-btn').style.display = "block"; // Arată butonul de copiere

  // Setează parola generată doar dacă este validă
  if (!password.startsWith("⚠️")) {
    generatedPassword = password;
  } else {
    generatedPassword = null;  // Nu setăm parola dacă există eroare
  }
}

// Funcție de generare a parolei
function generateLocalPassword(options) {
  let chars = "";

  // Dacă opțiunea "easyType" sau "easyRead" este activă, folosim un set de caractere mai restrâns
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

  // Eliminăm caracterele duplicate
  chars = [...new Set(chars)].join('');

  // Verificăm dacă lungimea parolei este posibilă
  if (options.length > chars.length) {
    return `⚠️ Poți genera maxim ${chars.length} caractere fără duplicate.`;
  }

  let available = chars.split('');
  let password = "";

  // Generăm parola aleatoriu
  for (let i = 0; i < options.length; i++) {
    const index = Math.floor(Math.random() * available.length);
    password += available[index];
    available.splice(index, 1); // Eliminăm caracterul folosit pentru a evita repetarea
  }

  return password.trim();
}

// Functia care se ocupă cu actualizarea valorii slider-ului
function setupLengthSlider() {
  const lengthInput = document.getElementById('length'); // Input-ul de tip range
  const lengthValue = document.getElementById('length-value'); // Span-ul unde se va afișa valoarea

  if (lengthInput && lengthValue) {
    // Setează valoarea inițială a slider-ului
    lengthValue.textContent = lengthInput.value;

    // Ascultă modificările slider-ului (se actualizează în timp real)
    lengthInput.addEventListener('input', () => {
      lengthValue.textContent = lengthInput.value; // Actualizează valoarea din span
    });
  }
}

// Funcție pentru copierea parolei în clipboard
function copyPassword() {
  const passwordField = document.getElementById('password');
  passwordField.select();
  document.execCommand('copy');
  alert("Parola a fost copiată!");
}

// Funcție pentru salvarea parolei într-un fișier .txt
function savePassword() {
  if (!generatedPassword) {
    alert("Trebuie generată o parolă validă mai întâi!");
    return;
  }

  const blob = new Blob([generatedPassword], { type: 'text/plain' });
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
  document.getElementById('copy-btn').style.display = "none"; // Ascunde butonul de copiere inițial
  document.getElementById('message').style.display = "none";
  setupLengthSlider();
};
