function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const uppercase = document.getElementById('uppercase').checked;
  const lowercase = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;
  const avoidSimilar = document.getElementById('avoid-similar').checked;
  const easyRead = document.getElementById('easy-read').checked;
  const easyType = document.getElementById('easy-type').checked;

  const url = `https://safekeys-backend.onrender.com/generate-password?length=${length}&uppercase=${uppercase}&lowercase=${lowercase}&numbers=${numbers}&symbols=${symbols}&noSimilar=${avoidSimilar}&easyRead=${easyRead}&easyType=${easyType}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('password').value = data.password;
      document.getElementById('copy-btn').style.display = "block";
      document.getElementById('message').style.display = "none";
    })
    .catch(err => {
      alert("Eroare la generarea parolei: " + err);
    });
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
