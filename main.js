/* ===================================================
   TAIWO AHMAD PORTFOLIO — SHARED JAVASCRIPT
=================================================== */

// ===== Sticky Navbar =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Animated Counters =====
let countersStarted = false;
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let start = 0;
  const step = Math.max(1, Math.ceil(target / 80));
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + suffix;
    if (start >= target) clearInterval(timer);
  }, 20);
}
const counterSection = document.getElementById('counters');
if (counterSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.counter-number').forEach(el => { if (el.dataset.count) animateCounter(el); });
    }
  }, { threshold: 0.3 }).observe(counterSection);
}

// ===== SEO Progress Bars =====
let seoBarsAnimated = false;
const seoSection = document.getElementById('seo');
if (seoSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !seoBarsAnimated) {
      seoBarsAnimated = true;
      document.querySelectorAll('.rank-bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width; }, 300);
      });
    }
  }, { threshold: 0.3 }).observe(seoSection);
}

// ===== Portfolio Filter =====
function filterPortfolio(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const show = category === 'all' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
  });
}

// ===== Contact Form =====
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('show');
  }, 1500);
}

// ===== Footer Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Smooth scroll (for anchor links on same page) =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});
