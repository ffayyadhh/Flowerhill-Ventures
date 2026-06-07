/* ============================================================
   FLOWERHILL VENTURES — script1.js
   ============================================================ */

// ── NAVBAR SCROLL STATE ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE NAV TOGGLE ──
function toggleNav() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navLinks');
    const btn = document.getElementById('hamburger');
    nav.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── LANGUAGE SWITCHER ──
function setLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = lang === 'en'
      ? el.getAttribute('data-en')
      : el.getAttribute('data-my');
  });
  // Use data-lang attribute for reliable active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// ── LIGHTBOX ──
function openLightbox(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── SCROLL FADE-IN ──
const fadeTargets = document.querySelectorAll(
  '.service-card, .ci-item, .vm-block, .why-item, .gallery-item, .about-text-col, .about-cards-col'
);
fadeTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.children)
      .filter(c => c.classList.contains('fade-up'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 90);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => observer.observe(el));

// ── ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
  });
  navLinks.forEach(link => {
    if (link.classList.contains('nav-cta')) return; // skip CTA button
    const isActive = link.getAttribute('href') === '#' + current;
    link.style.color = isActive ? 'var(--orange)' : '';
  });
}, { passive: true });