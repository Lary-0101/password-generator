const SAFE_LETTERS_LOWER = "abcdefghijkmnpqrstuvwxyz";
const SAFE_LETTERS_UPPER = "ABCDEFGHJKMNPQRSTUVWXYZ";
const SAFE_NUMBERS = "234679";
const SAFE_SYMBOLS = "!@#";

function generatePassword() {
  const start = performance.now();

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
  document.getElementById('copy-btn').style.display = "block";
  document.getElementById('message').style.display = "none";

  const end = performance.now();
  updateStats(password, end - start);
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

function copyPassword() {
  const passwordField = document.getElementById('password');
  if (!passwordField.value) {
    alert("Trebuie generată o parolă întâi!");
    return;
  }

  passwordField.select();
  document.execCommand("copy");
  document.getElementById('message').style.display = "block";
}

// 🔽 STATISTICI TEMPORARE
function updateStats(password, genTime) {
  let total = parseInt(sessionStorage.getItem("totalGenerated") || "0") + 1;
  sessionStorage.setItem("totalGenerated", total);
  document.getElementById("stat-total").textContent = total;

  let timeSum = parseFloat(sessionStorage.getItem("totalTime") || "0") + genTime;
  sessionStorage.setItem("totalTime", timeSum);
  const avgTime = Math.round(timeSum / total);
  document.getElementById("stat-time").textContent = avgTime;

  let last = JSON.parse(sessionStorage.getItem("lastPasswords") || "[]");
  last.unshift(password);
  if (last.length > 5) last = last.slice(0, 5);
  sessionStorage.setItem("lastPasswords", JSON.stringify(last));

  const list = document.getElementById("stat-last-passwords");
  list.innerHTML = "";
  last.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
}

function initStats() {
  document.getElementById("stat-total").textContent = sessionStorage.getItem("totalGenerated") || "0";
  const total = parseInt(sessionStorage.getItem("totalGenerated") || "0");
  const timeSum = parseFloat(sessionStorage.getItem("totalTime") || "0");
  document.getElementById("stat-time").textContent = total > 0 ? Math.round(timeSum / total) : 0;

  const list = document.getElementById("stat-last-passwords");
  const last = JSON.parse(sessionStorage.getItem("lastPasswords") || "[]");
  list.innerHTML = "";
  last.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
}

// 🔄 Slider dynamic pentru lungime
function setupLengthSlider() {
  const lengthInput = document.getElementById('length');
  const lengthValue = document.getElementById('length-value');
  if (lengthInput && lengthValue) {
    lengthValue.textContent = lengthInput.value;
    lengthInput.addEventListener('input', () => {
      lengthValue.textContent = lengthInput.value;
    });
  }
}

window.onload = () => {
  document.getElementById('password').value = '';
  document.getElementById('copy-btn').style.display = "none";
  document.getElementById('message').style.display = "none";
  initStats();
  setupLengthSlider();
};
