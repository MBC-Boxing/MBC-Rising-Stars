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
