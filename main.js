/* Moulescoomb Boxing Academy — mobile menu + back-to-top */
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var desktop = window.matchMedia('(min-width: 1241px)');

  function setOpen(open) {
    if (!toggle || !header) return;
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) setOpen(false);
    });

    // Never leave the mobile menu "open" when resizing up to desktop
    var onChange = function () { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  var topBtn = document.querySelector('.back-to-top');
  if (topBtn) {
    var onScroll = function () {
      topBtn.classList.toggle('is-visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();

/* Session video: play only when visible; respect reduced motion; pause button */
(function () {
  var v = document.getElementById('session-video');
  if (!v) return;
  var btn = document.querySelector('.video-toggle');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var userPaused = reduce;
  function sync() { if (btn) btn.setAttribute('aria-pressed', v.paused ? 'true' : 'false'); }
  function tryPlay() { if (!userPaused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
  if (reduce) { v.removeAttribute('autoplay'); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { v.preload = 'auto'; tryPlay(); } else { v.pause(); } sync(); });
    }, { threshold: 0.25 }).observe(v);
  } else { tryPlay(); }
  if (btn) btn.addEventListener('click', function () {
    if (v.paused) { userPaused = false; tryPlay(); } else { userPaused = true; v.pause(); }
    setTimeout(sync, 50);
  });
  v.addEventListener('play', sync); v.addEventListener('pause', sync);
  sync();
})();
