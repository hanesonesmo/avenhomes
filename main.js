// ── SHARED JS — Fine Modern Homes ──

// Scroll Progress
window.addEventListener('scroll', () => {
  const st = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = (st / dh * 100) + '%';
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', st > 50);
});

// Reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => revealObs.observe(el));

// Mobile Menu
function openMenu() { document.getElementById('mobileOverlay').classList.add('open'); }
function closeMenu() { document.getElementById('mobileOverlay').classList.remove('open'); }

// Active nav link
const links = document.querySelectorAll('.nav-links a');
links.forEach(a => {
  if (a.href === window.location.href) a.classList.add('active');
});

// Toast
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// Counter
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let c = 0, step = target / 55;
    const t = setInterval(() => {
      c += step; if (c >= target) { el.textContent = target + suffix; clearInterval(t); }
      else el.textContent = Math.floor(c) + suffix;
    }, 28);
  });
}
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); cObs.disconnect(); } });
}, { threshold: 0.3 });
const statEls = document.querySelectorAll('[data-count]');
if (statEls.length) cObs.observe(statEls[0]);