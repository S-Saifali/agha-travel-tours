var CAMPAIGN = {
  // Placeholder cut-off until the client confirms the real last safe date to apply.
  applyBy: new Date('2026-10-05T23:59:00+05:00'),
  ends: new Date('2026-11-04T18:00:00+08:00')
};
// Runs before DOMContentLoaded so post-fair visitors never see a flash of campaign content.
if (Date.now() > CAMPAIGN.ends.getTime()) document.documentElement.classList.add('campaign-over');

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Campaign state ---------- */
  var campaignOver = document.documentElement.classList.contains('campaign-over');
  // Hidden variant's fields must not be submitted (e.g. two "service" inputs).
  document.querySelectorAll(campaignOver ? '.only-campaign' : '.only-general').forEach(function (el) {
    el.querySelectorAll('input, select, textarea').forEach(function (f) { f.disabled = true; });
  });
  var applyLabel = CAMPAIGN.applyBy.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Karachi' });
  document.querySelectorAll('.js-apply-by').forEach(function (el) { el.textContent = applyLabel; });
  var daysToApply = Math.ceil((CAMPAIGN.applyBy.getTime() - Date.now()) / 86400000);
  document.querySelectorAll('.js-apply-left').forEach(function (el) {
    el.textContent = daysToApply > 1 ? daysToApply + ' days left to apply'
      : daysToApply === 1 ? 'Last day to apply'
      : 'Deadline passed — WhatsApp us for urgent cases';
  });
  if (daysToApply < 1) {
    document.querySelectorAll('.topbar .tb-count').forEach(function (el) { el.textContent = 'Urgent cases only'; });
  }

  document.querySelectorAll('.js-focus-apply').forEach(function (a) {
    a.addEventListener('click', function () {
      setTimeout(function () {
        var first = document.querySelector('#quick-apply input:not([type=hidden]):not([disabled])');
        if (first) first.focus({ preventScroll: true });
      }, 450);
    });
  });

  /* ---------- Scroll reveal ----------
     Self-contained IntersectionObserver reveal (no external library, so it
     can't go stale from late-loading web fonts shifting the layout like a
     cached-offset library would). Content is opacity:1 by default in CSS;
     this only ever ADDS visibility, and a safety-net timeout guarantees
     everything is visible even if something above fails. */
  var revealEls = document.querySelectorAll('[data-aos]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = el.dataset.aosDelay;
          if (delay) el.style.transitionDelay = (parseInt(delay, 10) / 1000) + 's';
          el.classList.add('in');
          revealObserver.unobserve(el);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
    // Safety net: force-reveal anything left behind (e.g. odd layout edge cases)
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }, 2500);
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
    var backTop = document.querySelector('.back-top');
    if (backTop) backTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var overlay = document.querySelector('.nav-overlay');
  function closeNav() { nav && nav.classList.remove('open'); overlay && overlay.classList.remove('open'); }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      overlay && overlay.classList.toggle('open');
    });
  }
  overlay && overlay.addEventListener('click', closeNav);
  document.querySelectorAll('.main-nav a').forEach(function (a) { a.addEventListener('click', closeNav); });

  /* ---------- Active nav link by current page ---------- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---------- Back to top ---------- */
  var backTop = document.querySelector('.back-top');
  backTop && backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var b = i.querySelector('.faq-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Canton Fair countdown (140th session — Oct 15, 2026) ---------- */
  var target = new Date('2026-10-15T09:30:00+08:00').getTime();
  function tick() {
    var now = Date.now();
    var diff = target - now;
    var boxes = document.querySelectorAll('.js-countdown');
    if (!boxes.length) return;
    var state = { d: 0, h: 0, m: 0, s: 0, over: false };
    if (diff <= 0) {
      state.over = true;
    } else {
      state.d = Math.floor(diff / 86400000);
      state.h = Math.floor((diff % 86400000) / 3600000);
      state.m = Math.floor((diff % 3600000) / 60000);
      state.s = Math.floor((diff % 60000) / 1000);
    }
    boxes.forEach(function (box) {
      if (state.over) { box.innerHTML = '<span class="cd-live">Canton Fair 2026 is now open</span>'; return; }
      var dEl = box.querySelector('[data-cd="d"]');
      var hEl = box.querySelector('[data-cd="h"]');
      var mEl = box.querySelector('[data-cd="m"]');
      var sEl = box.querySelector('[data-cd="s"]');
      if (dEl) dEl.textContent = String(state.d);
      if (hEl) hEl.textContent = String(state.h).padStart(2, '0');
      if (mEl) mEl.textContent = String(state.m).padStart(2, '0');
      if (sEl) sEl.textContent = String(state.s).padStart(2, '0');
    });
    document.querySelectorAll('.js-days-left').forEach(function (el) {
      el.textContent = state.over ? '0' : state.d;
    });
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Counter animation ---------- */
  var counters = document.querySelectorAll('.js-counter');
  if (counters.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var end = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = (end % 1 === 0) ? Math.floor(p * end) : (p * end).toFixed(1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { obs.observe(c); });
  }

  /* ---------- 3D tilt on review cards (mouse only) ---------- */
  var canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canTilt) {
    document.querySelectorAll('.js-tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((px - 0.5) * 18).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 14).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
        card.classList.add('is-tilting');
      });
      card.addEventListener('mouseleave', function () {
        // Removing the inline vars lets each card ease back to its resting fan angle.
        card.style.removeProperty('--ry');
        card.style.removeProperty('--rx');
        card.classList.remove('is-tilting');
      });
    });
  }

  /* ---------- Contact / inquiry forms -> WhatsApp handoff ---------- */
  document.querySelectorAll('.js-wa-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get('name') || '';
      var phone = data.get('phone') || '';
      var service = data.get('service') || '';
      var role = data.get('role') || '';
      var message = data.get('message') || '';
      var text = 'Hello Agha Travel & Tours, I would like a consultation.%0A' +
        'Name: ' + encodeURIComponent(name) + '%0A' +
        'Phone: ' + encodeURIComponent(phone) + '%0A' +
        (service ? 'Service: ' + encodeURIComponent(service) + '%0A' : '') +
        (role ? 'Attending as: ' + encodeURIComponent(role) + '%0A' : '') +
        (message ? 'Message: ' + encodeURIComponent(message) : '');
      window.open('https://wa.me/923009493348?text=' + text, '_blank');
      form.reset();
    });
  });
});
