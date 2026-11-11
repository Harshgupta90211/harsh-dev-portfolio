/* ==========================================================================
   HARSH KUMAR — PORTFOLIO INTERACTIONS (script.js)
   --------------------------------------------------------------------------
   Lightweight, dependency-free progressive enhancement:
     1. Sticky header state
     2. Mobile navigation drawer
     3. Scroll-reveal via IntersectionObserver
     4. Active navigation indicator
     5. Hero typewriter
   Every effect is skipped when the visitor prefers reduced motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Header gets a denser glass background once the page is scrolled
     ------------------------------------------------------------------------ */
  var header = document.querySelector('.header');

  if (header) {
    var syncHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  /* ------------------------------------------------------------------------
     2. Mobile navigation drawer
     Opens via the hamburger, closes on link click, backdrop click, Escape,
     or when the viewport grows past the mobile breakpoint.
     ------------------------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('primary-navigation');
  var backdrop = document.querySelector('.nav-backdrop');

  var setMenu = function (open) {
    if (!toggle || !navLinks) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
    if (open) {
      var first = navLinks.querySelector('.nav-link');
      if (first) first.focus({ preventScroll: true });
    }
  };

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.addEventListener('click', function (event) {
      if (event.target.closest('.nav-link')) setMenu(false);
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setMenu(false);
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------------
     3. Scroll reveal — adds .is-visible when an element enters the viewport.
        Elements are unobserved after revealing so nothing re-animates.
     ------------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, .timeline'
  );

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     4. Active navigation link driven by the section currently in view
     ------------------------------------------------------------------------ */
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = navItems
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  var setActive = function (id) {
    navItems.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A thin band around the middle of the viewport decides the active section
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------------
     5. Hero typewriter — cycles the roles stored in data-roles.
        Falls back to the static text already in the HTML when motion is
        reduced or the element is missing.
     ------------------------------------------------------------------------ */
  var typewriter = document.querySelector('.typewriter');

  if (typewriter) {
    var roles = (typewriter.getAttribute('data-roles') || '')
      .split('|')
      .map(function (role) {
        return role.trim();
      })
      .filter(Boolean);

    if (roles.length && !reduceMotion) {
      var roleIndex = 0;
      var charIndex = 0;
      var deleting = false;
      var TYPE_SPEED = 65;
      var DELETE_SPEED = 32;
      var HOLD_TIME = 1600;

      var tick = function () {
        var current = roles[roleIndex];

        if (!deleting) {
          charIndex += 1;
          typewriter.textContent = current.slice(0, charIndex);

          if (charIndex === current.length) {
            deleting = true;
            window.setTimeout(tick, HOLD_TIME);
            return;
          }
          window.setTimeout(tick, TYPE_SPEED);
        } else {
          charIndex -= 1;
          typewriter.textContent = current.slice(0, charIndex);

          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            window.setTimeout(tick, 320);
            return;
          }
          window.setTimeout(tick, DELETE_SPEED);
        }
      };

      typewriter.textContent = '';
      // Pause briefly before the first word so it doesn't fight the hero entrance
      window.setTimeout(tick, 900);
    }
  }

})();
