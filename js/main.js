/* =========================================================
   FB Informática — interacciones del sitio
   Sin dependencias externas.
   ========================================================= */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Menú móvil ---------- */
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');

    function setMenu(open) {
        if (!toggle || !menu) return;
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('is-open', open);
        toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación';
    }

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true');
        });

        // Cerrar al elegir una sección
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) setMenu(false);
        });

        // Cerrar con Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setMenu(false);
        });

        // Cerrar si volvemos a escritorio
        window.addEventListener('resize', function () {
            if (window.innerWidth > 960) setMenu(false);
        });
    }

    /* ---------- Sombra de la barra al hacer scroll ---------- */
    var nav = document.getElementById('nav');
    var toTop = document.getElementById('to-top');

    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        if (nav) nav.classList.toggle('is-scrolled', y > 12);
        if (toTop) toTop.classList.toggle('is-visible', y > 600);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            var first = document.querySelector('.skip-link');
            if (first) first.focus();
        });
    }

    /* ---------- Entradas animadas ---------- */
    var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        revealItems.forEach(function (el) { revealObserver.observe(el); });
    }

    /* ---------- Sección activa en el menú ---------- */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu ul a'));
    var sections = navLinks
        .map(function (link) { return document.querySelector(link.getAttribute('href')); })
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (link) {
                    link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach(function (section) { sectionObserver.observe(section); });
    }

    /* ---------- Año del pie ---------- */
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    window.__fbReady = true;
})();
