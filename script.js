
document.addEventListener('DOMContentLoaded', () => {

    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    const navLinks = [...document.querySelectorAll('.nav-link')];

    const mobileScreen = window.matchMedia('(max-width: 800px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // 01. MENU MOBILE

    function setMenuOpen(isOpen) {
        if (!menuButton || !nav) return;

        nav.classList.toggle('is-open', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));

        menuButton.setAttribute(
            'aria-label',
            isOpen ? 'Fermer le menu' : 'Ouvrir le menu'
        );

        const icon = menuButton.querySelector('i');

        if (icon) {
            icon.className = isOpen
                ? 'fas fa-xmark'
                : 'fas fa-bars';
        }
    }

    if (menuButton && nav) {

        menuButton.addEventListener('click', () => {
            const isOpen = nav.classList.contains('is-open');
            setMenuOpen(!isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setMenuOpen(false);
            });
        });

        document.addEventListener('click', event => {
            if (
                mobileScreen.matches &&
                nav.classList.contains('is-open') &&
                !nav.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', event => {
            if (
                event.key === 'Escape' &&
                nav.classList.contains('is-open')
            ) {
                setMenuOpen(false);
                menuButton.focus();
            }
        });

        mobileScreen.addEventListener('change', () => {
            setMenuOpen(false);
        });
    }


    // 02. NAVIGATION ACTIVE AU SCROLL

    const sections = navLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function updateActiveLink() {

        if (!sections.length) return;

        const marker = Math.max(
            100,
            Math.min(window.innerHeight * 0.35, 180)
        );

        const nearBottom =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 5;

        let currentSection = sections[0];

        if (nearBottom) {
            currentSection = sections[sections.length - 1];
        } else {
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= marker) {
                    currentSection = section;
                }
            }
        }

        navLinks.forEach(link => {

            const active =
                link.getAttribute('href') === `#${currentSection.id}`;

            link.classList.toggle('active', active);

            if (active) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }

        });
    }

    let scrollScheduled = false;

    function scheduleActiveLinkUpdate() {

        if (scrollScheduled) return;

        scrollScheduled = true;

        window.requestAnimationFrame(() => {
            updateActiveLink();
            scrollScheduled = false;
        });
    }

    window.addEventListener(
        'scroll',
        scheduleActiveLinkUpdate,
        { passive: true }
    );

    window.addEventListener('resize', scheduleActiveLinkUpdate);
    window.addEventListener('hashchange', scheduleActiveLinkUpdate);
    window.addEventListener('load', scheduleActiveLinkUpdate);

    updateActiveLink();


    // 03. ANIMATIONS AU DÉFILEMENT

    if (
        !reducedMotion.matches &&
        'IntersectionObserver' in window &&
        typeof Element.prototype.animate === 'function'
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const animation = entry.target.animate(
                        [
                            {
                                opacity: 0,
                                transform: 'translateY(20px)'
                            },
                            {
                                opacity: 1,
                                transform: 'translateY(0)'
                            }
                        ],
                        {
                            duration: 650,
                            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                            fill: 'both'
                        }
                    );

                    animation.addEventListener(
                        'finish',
                        () => animation.cancel(),
                        { once: true }
                    );

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -35px 0px'
            }
        );

        document.querySelectorAll(
            '.section-heading, .about-content, .skill-card, ' +
            '.timeline-item, .project-card'
        ).forEach(element => {
            revealObserver.observe(element);
        });

    }

});
