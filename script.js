document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CURSEUR CROSSHAIR
    ===================================================== */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }

    });


    function updateCursor() {

        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(updateCursor);
    }

    updateCursor();


    /* =====================================================
       CURSEUR AU SURVOL
    ===================================================== */

    const interactiveElements = document.querySelectorAll(
        "a, .skill-card, .project-card, .profile-panel, .stage-panel"
    );


    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            if (cursorRing) {
                cursorRing.classList.add("hover");
            }

        });


        element.addEventListener("mouseleave", () => {

            if (cursorRing) {
                cursorRing.classList.remove("hover");
            }

        });

    });


    /* =====================================================
       ANIMATION DES ÉLÉMENTS AU SCROLL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

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
       MENU ACTIF
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");


    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });


                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );


                if (activeLink) {
                    activeLink.classList.add("active");
                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       SCROLL FLUIDE DU MENU
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");


            if (!targetId || !targetId.startsWith("#")) {
                return;
            }


            const target = document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       PARALLAX DU CROSSHAIR
    ===================================================== */

    const heroCrosshair = document.querySelector(".hero-crosshair");


    document.addEventListener("mousemove", (event) => {

        if (!heroCrosshair) {
            return;
        }


        const mousePercentX =
            event.clientX / window.innerWidth - 0.5;

        const mousePercentY =
            event.clientY / window.innerHeight - 0.5;


        const movementX = mousePercentX * 18;
        const movementY = mousePercentY * 18;


        heroCrosshair.style.marginLeft = `${movementX}px`;
        heroCrosshair.style.marginTop = `${movementY}px`;

    });


    /* =====================================================
       PETIT EFFET DE MOUVEMENT SUR LES CARTES
    ===================================================== */

    const cards = document.querySelectorAll(
        ".skill-card, .project-card"
    );


    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            if (window.innerWidth <= 850) {
                return;
            }


            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;


            const rotateX = y * -3;
            const rotateY = x * 3;


            card.style.transform =
                `translateY(-7px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       DATE / ANNÉE DU FOOTER
    ===================================================== */

    const footerYear = document.querySelector(".footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

});
