/**
 * VEXORIQ-HX — Main JavaScript
 * Handles: Navigation, scroll, filters, form, animations
 */

'use strict';

/* ══════════════════════════════════════════════════════════
   1. Navigation
══════════════════════════════════════════════════════════ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile a[data-section]');

// Sticky nav — add class when scrolled
function updateNavScroll() {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

// Mobile menu toggle
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

function openMobileMenu() {
  navMobile.classList.add('open');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

function closeMobileMenu() {
  navMobile.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

// Close mobile menu when a link is clicked
navMobile && navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => closeMobileMenu());
});

// Close mobile menu on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navMobile && navMobile.classList.contains('open')) {
    if (!nav.contains(e.target) && !navMobile.contains(e.target)) {
      closeMobileMenu();
    }
  }
});


/* ══════════════════════════════════════════════════════════
   2. Smooth Scroll with Offset
══════════════════════════════════════════════════════════ */
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
  const offset = target.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top: offset, behavior: 'smooth' });
}

// Attach smooth scroll to ALL anchor links pointing to #sections
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      scrollToSection(id);
      closeMobileMenu();
    }
  });
});


/* ══════════════════════════════════════════════════════════
   3. Active Navigation Indicator
══════════════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
  const scrollPos = window.scrollY + navH + 40;

  let current = '';
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav__links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}


/* ══════════════════════════════════════════════════════════
   4. Project Filters
══════════════════════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active filter button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = (card.getAttribute('data-categories') || '').split(' ');
      const isVisible = filter === 'all' || categories.includes(filter);
      if (isVisible) {
        card.removeAttribute('data-hidden');
        card.style.display = '';
      } else {
        card.setAttribute('data-hidden', 'true');
        card.style.display = 'none';
      }
    });
  });
});


/* ══════════════════════════════════════════════════════════
   5. Scroll Reveal Animations
══════════════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');

// Check reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
} else {
  // If reduced motion or no IntersectionObserver, just show everything
  revealEls.forEach(el => el.classList.add('visible'));
}


/* ══════════════════════════════════════════════════════════
   6. Contact Form — Validation & Submission
══════════════════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

// Validation rules
const validators = {
  fullName: {
    validate: (v) => v.trim().length >= 2,
    message: 'Please enter your full name (at least 2 characters).'
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    message: 'Please enter a valid email address.'
  },
  inquiryType: {
    validate: (v) => v !== '',
    message: 'Please select an inquiry type.'
  },
  projectDetails: {
    validate: (v) => v.trim().length >= 20,
    message: 'Please describe your project in at least 20 characters.'
  }
};

function getFieldError(id) {
  return document.getElementById(`${id}Error`);
}

function showFieldError(id, message) {
  const errorEl = getFieldError(id);
  const inputEl = document.getElementById(id);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
  if (inputEl) inputEl.classList.add('error');
}

function clearFieldError(id) {
  const errorEl = getFieldError(id);
  const inputEl = document.getElementById(id);
  if (errorEl) {
    errorEl.classList.remove('visible');
  }
  if (inputEl) inputEl.classList.remove('error');
}

function validateForm() {
  let isValid = true;

  Object.keys(validators).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const value = input.value;
    const rule = validators[fieldId];

    if (!rule.validate(value)) {
      showFieldError(fieldId, rule.message);
      isValid = false;
    } else {
      clearFieldError(fieldId);
    }
  });

  return isValid;
}

// Live validation on blur
if (contactForm) {
  Object.keys(validators).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;

    input.addEventListener('blur', () => {
      const rule = validators[fieldId];
      if (input.value && !rule.validate(input.value)) {
        showFieldError(fieldId, rule.message);
      } else if (rule.validate(input.value)) {
        clearFieldError(fieldId);
      }
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        const rule = validators[fieldId];
        if (rule.validate(input.value)) {
          clearFieldError(fieldId);
        }
      }
    });
  });

  let isSubmitting = false;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Hide previous status
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    if (!validateForm()) {
      // Focus the first error field
      const firstError = contactForm.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        formStatus.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Message sent! I'll get back to you within 24 hours.
        `;
        formStatus.className = 'form-status success';
        formStatus.style.display = 'flex';
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      const isConfigError = err.message && (err.message.includes('access_key') || err.message.includes('invalid'));
      formStatus.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        ${isConfigError
          ? 'Form service not configured yet. Please contact me directly via email.'
          : 'Something went wrong. Please try again or contact me directly.'}
      `;
      formStatus.className = 'form-status error';
      formStatus.style.display = 'flex';
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }
  });
}


/* ══════════════════════════════════════════════════════════
   7. Dynamic Footer Year
══════════════════════════════════════════════════════════ */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ══════════════════════════════════════════════════════════
   8. Scroll Event Handler (throttled)
══════════════════════════════════════════════════════════ */
let scrollTicking = false;
function onScroll() {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      updateNavScroll();
      updateActiveLink();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
updateNavScroll(); // Run once on load
updateActiveLink();


/* ══════════════════════════════════════════════════════════
   9. Keyboard Accessibility — Skip Link
══════════════════════════════════════════════════════════ */
document.querySelectorAll('.skip-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  });
});
