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
  document.getElementById('copy-btn').style.display = "block";
  document.getElementById('message').style.display = "none";
}

function generateLocalPassword(options) {
  let chars = "";
  if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.numbers) chars += "0123456789";
  if (options.symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";

  if (options.noSimilar || options.readable) {
    chars = chars.replace(/[oO0l1]/g, "");
  }

  if (options.easyType) {
    chars = chars.replace(/[!@#$%^&*()]/g, "");
  }

  if (!chars.length) return "⚠️ Selectează cel puțin un set de caractere!";

  // Elimină duplicate
  chars = [...new Set(chars)].join('');

  if (options.length > chars.length) {
    return `⚠️ Poți genera maxim ${chars.length} caractere fără duplicate.`;
  }

  // Generează parolă fără caractere repetate
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

window.onload = () => {
  document.getElementById('password').value = '';
  document.getElementById('copy-btn').style.display = "none";
  document.getElementById('message').style.display = "none";
};
