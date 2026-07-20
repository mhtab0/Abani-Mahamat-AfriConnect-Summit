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
/* ==========================================================================
   COMMIT 9 - COMPTE À REBOURS EN TEMPS RÉEL
   Calcule le temps restant jusqu'à la date fictive de la conférence
   et met à jour l'affichage chaque seconde.
   ========================================================================== */
const countdownEl = document.getElementById('countdown');

if (countdownEl) {
    // Date fictive de la conférence : 15 décembre 2026, 09h00
    const eventDate = new Date('2026-12-15T09:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance <= 0) {
            countdownEl.innerHTML = '<p>L\'événement a commencé !</p>';
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // padStart ajoute un "0" devant si le nombre a un seul chiffre (ex: "07")
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   COMMIT 9 - COMPTEURS ANIMÉS AU SCROLL (chiffres clés)
   Incrémente chaque .stat-number de 0 jusqu'à data-target dès qu'il
   entre dans le viewport, une seule fois.
   ========================================================================== */
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target); // ne se déclenche qu'une fois
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1500; // durée totale de l'animation en ms
        const stepTime = 16; // ~60 images par seconde
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const counterInterval = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(counterInterval);
            } else {
                el.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

/* ANIMATIONS AU SCROLL (fade-in générique) Ajoute la classe .in-view (stylée en CSS) dès qu'un élément marqué data-animate entre dans le viewport.*/
const animatedElements = document.querySelectorAll('[data-animate]');

if (animatedElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => scrollObserver.observe(el));
}

/* ONGLETS DU PROGRAMME (Jour 1 / Jour 2 / Jour 3) */
const tabButtons = document.querySelectorAll('.tab-btn');

if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const day = btn.getAttribute('data-day');

            // Réinitialise tous les boutons et panneaux
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
                panel.setAttribute('hidden', '');
            });

            // Active le bouton et le panneau cliqués
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const activePanel = document.getElementById(`day-${day}`);
            activePanel.classList.add('active');
            activePanel.removeAttribute('hidden');
        });
    });
}

/* FILTRAGE DYNAMIQUE DES INTERVENANTS */
const filterButtons = document.querySelectorAll('.filter-btn');
const speakerCards = document.querySelectorAll('.speakers-grid-full .speaker-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            speakerCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'tous' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* VALIDATION DU FORMULAIRE D'INSCRIPTION */
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    const fields = {
        fullname: { regex: /.+/, message: 'Le nom complet est requis.' },
        email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Adresse email invalide.' },
        phone: { regex: /^[0-9\s+]{8,}$/, message: 'Le téléphone doit contenir au moins 8 chiffres.' },
        participation: { regex: /.+/, message: 'Veuillez choisir un type de participation.' },
        country: { regex: /.+/, message: 'Veuillez choisir un pays.' },
        message: { regex: /.{20,}/, message: 'Le message doit contenir au moins 20 caractères.' }
    };

    function validateField(name) {
        const input = document.getElementById(name);
        const formGroup = input.closest('.form-group');
        const errorEl = document.getElementById(`${name}-error`);
        const rule = fields[name];

        if (rule.regex.test(input.value.trim())) {
            formGroup.classList.remove('invalid');
            formGroup.classList.add('valid');
            errorEl.textContent = '';
            return true;
        } else {
            formGroup.classList.remove('valid');
            formGroup.classList.add('invalid');
            errorEl.textContent = rule.message;
            return false;
        }
    }

    // Validation en temps réel à chaque saisie
    Object.keys(fields).forEach(name => {
        document.getElementById(name).addEventListener('input', () => validateField(name));
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // On valide tous les champs et on vérifie qu'ils sont tous corrects
        const results = Object.keys(fields).map(name => validateField(name));
        const isFormValid = results.every(result => result === true);

        if (isFormValid) {
            document.getElementById('successMessage').removeAttribute('hidden');
            registrationForm.reset();

            // Retire les classes valid/invalid après reset pour un formulaire propre
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('valid', 'invalid');
            });
        }
    });
}