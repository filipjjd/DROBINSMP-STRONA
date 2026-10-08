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
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// copy IP to clipboard
function copyIP(btn, ip) {
  ip = ip || 'mc.drobinsmp.pl';
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

// Teaser images open in a keyboard-accessible native dialog.
const teaserViewer = document.getElementById('teaserViewer');
const teaserPhotos = Array.from(document.querySelectorAll('.teaser-photo'));
if (teaserViewer && typeof teaserViewer.showModal === 'function') {
  const fullImage = teaserViewer.querySelector('.teaser-full-image');
  const counter = teaserViewer.querySelector('.teaser-counter');
  let activePhoto = 0;
  function showPhoto(index) {
    activePhoto = (index + teaserPhotos.length) % teaserPhotos.length;
    const photo = teaserPhotos[activePhoto];
    fullImage.src = photo.href;
    fullImage.alt = photo.querySelector('img').alt;
    counter.textContent = `${activePhoto + 1} / ${teaserPhotos.length}`;
  }
  teaserPhotos.forEach((photo, index) => {
    photo.addEventListener('click', event => {
      event.preventDefault();
      showPhoto(index);
      teaserViewer.showModal();
      document.body.classList.add('teaser-open');
    });
  });
  teaserViewer.querySelector('.teaser-close').addEventListener('click', () => teaserViewer.close());
  teaserViewer.querySelector('.teaser-prev').addEventListener('click', () => showPhoto(activePhoto - 1));
  teaserViewer.querySelector('.teaser-next').addEventListener('click', () => showPhoto(activePhoto + 1));
  teaserViewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(activePhoto + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  teaserViewer.addEventListener('click', event => {
    const bounds = teaserViewer.getBoundingClientRect();
    if (event.target === teaserViewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      teaserViewer.close();
    }
  });
  teaserViewer.addEventListener('close', () => {
    document.body.classList.remove('teaser-open');
    teaserPhotos[activePhoto].focus();
  });
}

// Prepare a product message for the external Tipply form.
const shopProducts = document.querySelectorAll('[data-product]');
const shopMessage = document.getElementById('shopMessage');
if (shopMessage) {
  shopProducts.forEach(button => button.addEventListener('click', () => {
    shopProducts.forEach(option => option.setAttribute('aria-pressed', option === button));
    document.getElementById('shopSelection').textContent = button.dataset.label;
    document.getElementById('shopAmount').textContent = `${button.dataset.price} zł`;
    shopMessage.textContent = `KOD PRODUKTU: ${button.dataset.product}`;
  }));
  const copyButton = document.getElementById('shopCopy');
  copyButton.addEventListener('click', async () => {
    const original = 'Kopiuj wiadomość';
    try {
      await navigator.clipboard.writeText(shopMessage.textContent);
      copyButton.textContent = 'Skopiowano!';
    } catch (error) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(shopMessage);
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = 'Zaznaczono — skopiuj ręcznie';
    }
    setTimeout(() => { copyButton.textContent = original; }, 2500);
  });
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
