// Drobin SMP — wspólny skrypt dla wszystkich podstron

// nav scroll state
const nav = document.getElementById('siteNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  }));
}

// copy IP to clipboard
function copyIP(btn) {
  const ip = 'drobinsmp.pl';
  const original = btn.textContent;
  function done() {
    btn.textContent = 'Skopiowano!';
    setTimeout(() => { btn.textContent = original; }, 1800);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(ip).then(done).catch(() => fallbackCopy(ip, done));
  } else {
    fallbackCopy(ip, done);
  }
}
function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
  cb();
}

// ambient particles (only present in hero on index.html)
const particleHost = document.getElementById('particles');
if (particleHost) {
  const colors = ['var(--gold)', 'var(--redstone)', 'var(--parchment)'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = (Math.random() * 100) + '%';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.animationDuration = (10 + Math.random() * 10) + 's';
    const size = 2 + Math.random() * 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    particleHost.appendChild(p);
  }
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}
