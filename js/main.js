/* DARK MODE / LIGHT MODE Le thème est stocké dans localStorage et persiste entre les pages et les rechargements. Le CSS réagit via l'attribut data-theme sur <html>. */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Au chargement : on applique le thème déjà enregistré (ou "light" par défaut)
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

themeToggle.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';

    if (isDark) {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
});

/* NAVBAR DYNAMIQUE AU SCROLL Ajoute la classe .scrolled (déjà stylée en CSS) après 80px de défilement. */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* MENU HAMBURGER (mobile) Ouverture/fermeture au clic. On bascule aussi aria-expanded pour l'accessibilité (déjà présent dans le HTML avec la valeur "false"). */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
});

/* BOUTON RETOUR EN HAUT Apparaît après 300px de défilement (classe .visible déjà stylée en CSS), remonte en douceur au clic. */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ANNÉE DYNAMIQUE DANS LE FOOTER */
document.getElementById('year').textContent = new Date().getFullYear();