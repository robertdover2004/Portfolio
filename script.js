// Smooth scrolling for nav links
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70, // offset for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});

// Animate project cards on scroll into view
const projectCards = document.querySelectorAll('.project-card');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

projectCards.forEach(card => {
  observer.observe(card);
});

// 3D Parallax + Mouse Tilt effect for hero image
const heroImage = document.querySelector('.hero-image');
const heroSection = document.querySelector('.hero-section');
const heroImageContainer = document.querySelector('.hero-image-container');

if (heroImage && heroSection && heroImageContainer) {
  // Scroll-based 3D effect
  window.addEventListener('scroll', () => {
    const rect = heroSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollProgress = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);
    heroImageContainer.style.boxShadow = `0 12px 48px rgba(0,191,255,${0.18 + 0.22 * scrollProgress})`;
    heroImage.style.boxShadow = `0 8px 40px rgba(0,191,255,${0.25 + 0.25 * scrollProgress})`;
    // Add a subtle Z translation for depth
    heroImage.style.transform = `translateZ(${scrollProgress * 40}px) scale(${1.04 + scrollProgress * 0.04})`;
  });

  // Mouse-based 3D tilt
  heroImageContainer.addEventListener('mousemove', (e) => {
    const rect = heroImageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 18; // -18deg to +18deg
    const rotateX = ((centerY - y) / centerY) * 14; // -14deg to +14deg
    heroImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.08)`;
  });

  heroImageContainer.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.04)';
  });
}

// Floating particles effect for extra engagement
function createParticles() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 16 + 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 90 + 5}%`;
    particle.style.bottom = `-${Math.random() * 100 + 20}px`;
    particle.style.background = `rgba(0,191,255,${Math.random() * 0.3 + 0.2})`;
    particle.style.animationDelay = `${Math.random() * 12}s`;
    hero.appendChild(particle);
  }
}
createParticles();

// Typing effect for hero section
function typeText(element, text, speed = 60, callback) {
  let i = 0;
  function type() {
    if (i <= text.length) {
      element.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function loopTyping(element, text, speed = 60, delay = 1200) {
  function start() {
    let i = 0;
    function type() {
      if (i <= text.length) {
        element.textContent = text.slice(0, i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(erase, delay);
      }
    }
    function erase() {
      if (i >= 0) {
        element.textContent = text.slice(0, i);
        i--;
        setTimeout(erase, speed / 2);
      } else {
        setTimeout(type, speed * 2);
      }
    }
    type();
  }
  start();
}

window.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('typed-title');
  const desc = document.getElementById('typed-desc');
  if (title && desc) {
    // Set the upper text instantly (no typing effect)
    title.textContent = "Hello, I'm Robert Dover";
    // Animate only the lower text in a loop
    loopTyping(desc, "Creative Full-Stack Developer crafting immersive web experiences.", 65, 1800);
  }
});
