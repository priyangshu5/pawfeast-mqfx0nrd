document.addEventListener('DOMContentLoaded', function() {

    var nav = document.querySelector('header nav');
    var logo = document.querySelector('.logo');
    var navUl = document.querySelector('header nav ul');

    if (logo && navUl && nav) {
        var menuToggle = document.createElement('button');
        menuToggle.setAttribute('aria-label', 'Toggle navigation');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        logo.insertAdjacentElement('afterend', menuToggle);

        menuToggle.addEventListener('click', function() {
            var isOpen = nav.classList.toggle('open');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        var navLinks = navUl.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    var revealElements = document.querySelectorAll('section, .product-card, blockquote');
    if (revealElements.length > 0) {
        revealElements.forEach(function(el) {
            el.classList.add('reveal');
        });

        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15
        };

        var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(function(el) {
            revealObserver.observe(el);
        });
    }

    var header = document.querySelector('header');
    if (header) {
        var lastScrollY = 0;
        window.addEventListener('scroll', function() {
            var currentScrollY = window.scrollY;
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    var footer = document.getElementById('footer');
    if (footer) {
        var copyrightP = footer.querySelector('p');
        if (copyrightP) {
            var currentYear = new Date().getFullYear();
            copyrightP.innerHTML = copyrightP.innerHTML.replace(/\d{4}/, currentYear);
        }
    }

    var subscribeForm = document.querySelector('#subscribe form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var emailInput = document.getElementById('email');
            if (emailInput && emailInput.value) {
                var successMsg = document.createElement('p');
                successMsg.textContent = 'Thanks for subscribing! Welcome to the pack.';
                successMsg.classList.add('subscribe-success');
                subscribeForm.innerHTML = '';
                subscribeForm.appendChild(successMsg);
            }
        });
    }

});