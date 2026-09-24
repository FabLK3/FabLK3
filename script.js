document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANNÉE DU FOOTER
    ===================================================== */

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       FERMETURE DU MENU EN CLIQUANT À CÔTÉ
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navigation || !menuButton) {
            return;
        }

        const clickedInsideMenu =
            navigation.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            navigation.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       CURSEUR PERSONNALISÉ
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor-dot");

    const hasFinePointer =
        window.matchMedia("(pointer: fine)").matches;


    if (hasFinePointer && cursor && cursorDot) {

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });


        function animateCursor() {

            cursorX +=
                (mouseX - cursorX) * 0.18;

            cursorY +=
                (mouseY - cursorY) * 0.18;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .skill-logo, .tool-item, .project-card, .timeline-content, .hud-card, input, textarea"
            );


        interactiveElements.forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursor.classList.add("hover");
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursor.classList.remove("hover");
                }
            );

        });

    }


    /* =====================================================
       ANIMATION DES SECTIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       MENU ACTIF SELON LA SECTION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.id;


                    navLinks.forEach((link) => {

                        const linkTarget =
                            link.getAttribute("href");


                        link.classList.toggle(
                            "active",
                            linkTarget === `#${currentId}`
                        );

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       BOUTON RETOUR EN HAUT
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        const updateBackToTop =
            () => {

                if (window.scrollY > 500) {

                    backToTop.classList.add("visible");

                } else {

                    backToTop.classList.remove("visible");

                }

            };


        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );


        updateBackToTop();

    }


    /* =====================================================
       LIENS "#"
    ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                }
            );

        });


    /* =====================================================
       SCROLL FLUIDE POUR LES ANCRES
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(targetId);


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

});
