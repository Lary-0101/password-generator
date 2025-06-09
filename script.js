// script.js REVIZUIT COMPLET

// Actualizează valoarea afișată pentru slider
function updateLengthValue() {
  const length = document.getElementById('length').value;
  document.getElementById('length-value').textContent = length;
  updateStrengthRealTime();
}

// Calculează scorul parolei
function calculatePasswordStrength(options, password) {
  let score = 0;
  if (password.length >= 12) score += 40;
  else if (password.length >= 8) score += 20;
  else score += 10;

  if (options.uppercase) score += 15;
  if (options.lowercase) score += 15;
  if (options.numbers) score += 15;
  if (options.symbols) score += 15;
  if (options.avoidSimilar && /([a-zA-Z0-9]).*\1/.test(password)) score -= 10;

  return Math.min(Math.max(score, 0), 100);
}

// Actualizează scorul în timp real
function updateStrengthRealTime() {
  const length = parseInt(document.getElementById('length').value);
  const options = getOptions(length);

  const tempPassword = generateLocalPassword(options);
  const score = calculatePasswordStrength(options, tempPassword);

  document.getElementById('strength-score').textContent = `${score}%`;
  const bar = document.getElementById('strength-bar');
  bar.style.width = `${score}%`;
  bar.style.background = score >= 80 ? '#22c55e' : score >= 50 ? '#facc15' : '#ef4444';
}

// Comută vizibilitatea parolei
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleButton = document.getElementById('toggle-password');
  const password = passwordInput.getAttribute('data-password');

  if (passwordInput.value === '***********' && password) {
    passwordInput.value = password;
    toggleButton.textContent = '🙈';
  } else {
    passwordInput.value = '***********';
    toggleButton.textContent = '👁️';
  }
}

// Obține opțiunile selectate
function getOptions(length) {
  return {
    uppercase: document.getElementById('uppercase').checked,
    lowercase: document.getElementById('lowercase').checked,
    numbers: document.getElementById('numbers').checked,
    symbols: document.getElementById('symbols').checked,
    readable: document.getElementById('readable').checked,
    easyType: document.getElementById('easy-type').checked,
    avoidSimilar: document.getElementById('avoid-similar').checked,
    length
  };
}

// Generează parola
function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const options = getOptions(length);

  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
    document.getElementById('password').value = "⚠️ Selectează cel puțin un set de caractere!";
    document.getElementById('strength-score').textContent = '0%';
    document.getElementById('strength-bar').style.width = '0%';
    document.getElementById('strength-bar').style.background = '#ef4444';
    document.getElementById('password-hash').textContent = '';
    return;
  }

  const password = generateLocalPassword(options);
  document.getElementById('password').setAttribute("data-password", password);
  document.getElementById('password').value = '***********';

  const score = calculatePasswordStrength(options, password);
  document.getElementById('strength-score').textContent = `${score}%`;
  document.getElementById('strength-bar').style.width = `${score}%`;
  document.getElementById('strength-bar').style.background = score >= 80 ? '#22c55e' : score >= 50 ? '#facc15' : '#ef4444';
}

// Creează parola locală
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
  }

  return password.trim();
}

// Salvează parola în fișier
function savePassword() {
  const password = document.getElementById('password').getAttribute("data-password");
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

// Atașează evenimentele la încărcarea DOM
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById('length').addEventListener('input', updateLengthValue);

  document.querySelectorAll('#uppercase, #lowercase, #numbers, #symbols, #readable, #easy-type, #avoid-similar')
    .forEach(input => input.addEventListener('change', updateStrengthRealTime));

  document.getElementById("toggle-password").addEventListener("click", togglePasswordVisibility);
  document.querySelector(".btn-primary").addEventListener("click", generatePassword);
  document.querySelector(".btn-danger").addEventListener("click", savePassword);
});
