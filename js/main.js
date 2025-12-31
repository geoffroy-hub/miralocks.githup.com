// main.js - interactions for MiraLocks including language switching
document.addEventListener('DOMContentLoaded', function(){
  // Language switching functionality
  const languages = ["fr", "en", "ew"];
  let currentIndex = 0;

  const langBtn = document.getElementById("langBtn");
  if(langBtn) {
    langBtn.addEventListener("click", function() {
      currentIndex = (currentIndex + 1) % languages.length;
      const lang = languages[currentIndex];
      changeLanguage(lang);
      const labels = { fr: "🌍 FR", en: "🌍 EN", ew: "🌍 EW" };
      langBtn.textContent = labels[lang];
    });
  }

  // Form handling
  const form = document.getElementById('rendezvous-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const lang = getCurrentLanguage();
      const messages = {
        fr: 'Merci ! Votre demande de rendez-vous a été reçue. Nous vous contacterons via WhatsApp ou téléphone.',
        en: 'Thank you! Your appointment request has been received. We will contact you via WhatsApp or phone.',
        ew: 'Akpe! Wò biamɔ na ŋkekeɖoɖo la míexɔe. Míakpli wò via WhatsApp alo telefon.'
      };
      alert(messages[lang] || messages.fr);
      form.reset();
    });
  }

  // Contact form handling
  const contactForm = document.querySelector('#contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const lang = getCurrentLanguage();
      const messages = {
        fr: 'Merci, votre message a été envoyé (simulation).',
        en: 'Thank you, your message has been sent (simulation).',
        ew: 'Akpe, wò ŋugbe la ɖoe (simulation).'
      };
      alert(messages[lang] || messages.fr);
      contactForm.reset();
    });
  }
});

function changeLanguage(lang) {
  document.querySelectorAll("[data-fr]").forEach(el => {
    const key = el.getAttribute("data-fr");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll("[data-placeholder-fr]").forEach(el => {
    const key = el.getAttribute("data-placeholder-fr");
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update select options
  document.querySelectorAll("select option[data-fr]").forEach(option => {
    const key = option.getAttribute("data-fr");
    if (translations[lang] && translations[lang][key]) {
      option.textContent = translations[lang][key];
    }
  });

  // Store current language
  localStorage.setItem('selectedLanguage', lang);
}

function getCurrentLanguage() {
  return localStorage.getItem('selectedLanguage') || 'fr';
}

// Load saved language on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = getCurrentLanguage();
  if (savedLang !== 'fr') {
    changeLanguage(savedLang);
    const langBtn = document.getElementById("langBtn");
    if(langBtn) {
      const labels = { fr: "🌍 FR", en: "🌍 EN", ew: "🌍 EW" };
      langBtn.textContent = labels[savedLang];
    }
  }

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Apply different animations to different elements
  document.querySelectorAll('section').forEach((section, index) => {
    section.classList.add('fade-in');
    section.style.animationPlayState = 'paused';
    observer.observe(section);
  });

  // Hero intro slides in from left
  const heroIntro = document.querySelector('.hero .intro');
  if (heroIntro) {
    heroIntro.classList.add('slide-left');
    heroIntro.style.animationPlayState = 'paused';
    observer.observe(heroIntro);
  }

  // Contact card slides in from right
  const contactCard = document.querySelector('.hero .contact-card');
  if (contactCard) {
    contactCard.classList.add('slide-right');
    contactCard.style.animationPlayState = 'paused';
    observer.observe(contactCard);
  }

  // Service cards bounce in with stagger
  document.querySelectorAll('.services .card').forEach((card, index) => {
    card.classList.add('bounce-in', `stagger-${index + 1}`);
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });

  // Gallery items fade in with stagger
  document.querySelectorAll('.gallery img, .gallery video').forEach((item, index) => {
    item.classList.add('fade-in', `stagger-${index + 1}`);
    item.style.animationPlayState = 'paused';
    observer.observe(item);
  });

  // WhatsApp button floats
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.classList.add('float');
  }

  // Brand entrance animation
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.style.animationPlayState = 'running';
  }
});

// 🎧 Automatic Playback of Intro Sound + Splash 5500ms
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");

  // Lancer audio automatique
  setTimeout(() => {
    const sound = document.getElementById("introSound");
    if (sound) {
      sound.volume = 0.25;
      sound.play().catch(() => {
        console.log("Autoplay blocked by browser.");
      });
    }
  }, 300);

  // Retirer le splash
  setTimeout(() => {
    if (splash) splash.remove();
    // Jouer la musique à la fin de l'animation
    const sound = document.getElementById("introSound");
    if (sound) {
      sound.currentTime = 0;
      sound.volume = 0.25;
      sound.play().catch(() => {
        console.log("Autoplay blocked by browser.");
      });
    }
  }, 5500);
});

// 🔊 Son uniquement sur index
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("splash")) return; // pas de splash = pas de son

  const splash = document.getElementById("splash");
  const btn = document.getElementById("enterSite");
  const sound = document.getElementById("introSound");

  if (!btn || !sound) return;

  btn.addEventListener("click", () => {
    sound.volume = 0.25;
    sound.currentTime = 0;
    sound.play().catch(() => {
      console.log("Lecture audio bloquée par le navigateur.");
    });

    splash.style.transition = "opacity 0.8s ease";
    splash.style.opacity = "0";

    setTimeout(() => {
      splash.remove();
    }, 800);
  });
});
