function generatePassword() {
  fetch("https://safekeys-backend.onrender.com/generate-password")
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
