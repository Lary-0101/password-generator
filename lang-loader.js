function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.innerHTML = data[key];
      });
      localStorage.setItem("lang", lang);
    })
    .catch(err => console.error("Eroare la încărcarea limbii:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ro";
  loadLanguage(savedLang);
});
