/* ── Navbar: scroll shadow ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Mobile nav toggle ── */
const toggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navWa = document.querySelector('.nav-wa');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  /* animate hamburger → X */
  const spans = toggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

/* Close menu on link click */
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      /* stagger siblings inside a grid */
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  /* Auto-stagger cards that share a parent grid */
  const parent = el.parentElement;
  if (parent.classList.contains('services-grid') ||
      parent.classList.contains('reviews-grid')  ||
      parent.classList.contains('contact-grid')) {
    const siblings = Array.from(parent.querySelectorAll('.reveal'));
    el.dataset.delay = siblings.indexOf(el) * 100;
  }
  observer.observe(el);
});

/* ── Smooth active link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
