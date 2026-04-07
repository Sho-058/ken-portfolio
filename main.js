// ==========================================
// Back to Top Button
// ==========================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// Audio Player
// ==========================================
const radioPlayBtn = document.querySelector('.radio-play-btn');

if (radioPlayBtn) {
  const audio = new Audio('CareTech.mp3');
  let isPlaying = false;

  const playIconSVG = `
    <svg width="24" height="24" viewBox="0 0 19 24" fill="none">
      <polygon points="5,3 19,12 5,21" fill="#b058f9"/>
    </svg>
  `;

  const stopIconSVG = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="6" width="12" height="12" fill="#b058f9" rx="2"/>
    </svg>
  `;

  radioPlayBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      radioPlayBtn.innerHTML = playIconSVG;
      isPlaying = false;
    } else {
      audio.play();
      radioPlayBtn.innerHTML = stopIconSVG;
      isPlaying = true;
    }
  });

  audio.addEventListener('ended', () => {
    radioPlayBtn.innerHTML = playIconSVG;
    isPlaying = false;
  });
}

// ==========================================
// Animation System
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================
  // 1. Hero section load animations
  // ============================
  if (!prefersReducedMotion) {
    const heroElements = [
      { selector: '.hero-profile-section', delay: 'hero-anim-1' },
      { selector: '.hero-name',            delay: 'hero-anim-1' },
      { selector: '.hero-title-row',       delay: 'hero-anim-2' },
      { selector: '.hero-glass-box',       delay: 'hero-anim-3' },
    ];

    heroElements.forEach(({ selector, delay }) => {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.add('hero-anim', delay);
      }
    });
  }

  // ============================
  // 2. Scroll reveal (Intersection Observer)
  // ============================

  // Add reveal class to target elements
  const revealTargets = [
    // Projects section
    '.project-block .image-gallery',
    '.project-block .project-details',
    // Skills section
    '.section-skills .section-title-row',
    '.skills-headline-row',
    '.skill-card-dark',
    '.skills-list-grid',
    // Tools section
    '.section-tools .section-title-row',
    '.tool-category',
    // Content section
    '.section-content .section-title-row',
    '.content-item',
    '.content-gallery-full',
    // Footer
    '.footer-content',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!prefersReducedMotion) {
        el.classList.add('reveal');
      }
    });
  });

  // Apply stagger delays to skill cards
  document.querySelectorAll('.skill-card-dark').forEach((card, i) => {
    if (!prefersReducedMotion) {
      card.classList.add(`reveal-delay-${Math.min(i + 1, 5)}`);
    }
  });

  // Apply stagger delays to tool categories
  document.querySelectorAll('.tool-category').forEach((cat, i) => {
    if (!prefersReducedMotion) {
      cat.classList.add(`reveal-delay-${Math.min(i + 1, 5)}`);
    }
  });

  // Set up Intersection Observer
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05
    });

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ============================
  // 3. Skills headline underline animation
  // ============================
  const headline = document.querySelector('.skills-headline');

  if (headline) {
    const headlineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          headlineObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    });

    headlineObserver.observe(headline);
  }
});
