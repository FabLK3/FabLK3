/* =========================================================
   PORTFOLIO FABJO LAMI
   SCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   ANNÉE AUTOMATIQUE DANS LE FOOTER
   ========================================================= */

const footerYear = document.getElementById("footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigationLinks = document.querySelectorAll(".nav-link");


if (siteHeader && menuButton) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            siteHeader.classList.toggle("open");

        menuButton.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            siteHeader.classList.remove("open");

            menuButton.classList.remove("active");

            document.body.classList.remove(
                "menu-open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   FERMER LE MENU MOBILE EN CLIQUANT À L'EXTÉRIEUR
   ========================================================= */

document.addEventListener("click", event => {

    if (
        !siteHeader ||
        !menuButton ||
        window.innerWidth > 850
    ) {
        return;
    }


    const clickInsideHeader =
        siteHeader.contains(event.target);

    const clickOnButton =
        menuButton.contains(event.target);


    if (
        !clickInsideHeader &&
        !clickOnButton &&
        siteHeader.classList.contains("open")
    ) {

        siteHeader.classList.remove("open");

        menuButton.classList.remove("active");

        document.body.classList.remove(
            "menu-open"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   CURSEUR PERSONNALISÉ
   ========================================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");


let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;


let cursorX = mouseX;
let cursorY = mouseY;


if (cursor && cursorDot) {

    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    const animateCursor = () => {

        cursorX +=
            (mouseX - cursorX) * 0.18;

        cursorY +=
            (mouseY - cursorY) * 0.18;


        cursor.style.left =
            `${cursorX}px`;

        cursor.style.top =
            `${cursorY}px`;


        requestAnimationFrame(
            animateCursor
        );

    };


    requestAnimationFrame(
        animateCursor
    );

}


/* =========================================================
   EFFET CURSEUR SUR LES ÉLÉMENTS CLIQUABLES
   ========================================================= */

const interactiveElements =
    document.querySelectorAll(
        `
        a,
        button,
        input,
        textarea,
        .skill-logo,
        .tool-item,
        .project-card,
        .timeline-content,
        .about-objectives > div
        `
    );


interactiveElements.forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            if (cursor) {
                cursor.classList.add("hover");
            }

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            if (cursor) {
                cursor.classList.remove("hover");
            }

        }
    );

});


/* =========================================================
   ANIMATIONS D'APPARITION
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");


                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}
else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================================
   LIEN DE NAVIGATION ACTIF
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const setActiveNavigation =
    sectionId => {

        navigationLinks.forEach(link => {

            const target =
                link.getAttribute("href");

            const isActive =
                target === `#${sectionId}`;


            link.classList.toggle(
                "active",
                isActive
            );

        });

    };


if (
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        setActiveNavigation(
                            entry.target.id
                        );

                    }

                });

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }

        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   SCROLL DOUX SUR LES LIENS INTERNES
   ========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const targetSection =
                document.querySelector(
                    targetId
                );


            if (!targetSection) {
                return;
            }


            event.preventDefault();


            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   BOUTON RETOUR EN HAUT
   ========================================================= */

const backToTop =
    document.querySelector(
        ".back-to-top"
    );


const updateBackToTop = () => {

    if (!backToTop) {
        return;
    }


    if (
        window.scrollY > 500
    ) {

        backToTop
            .classList
            .add("visible");

    }
    else {

        backToTop
            .classList
            .remove("visible");

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


/* =========================================================
   PETIT EFFET PARALLAX DU FOND
   ========================================================= */

const glowOne =
    document.querySelector(
        ".glow-one"
    );

const glowTwo =
    document.querySelector(
        ".glow-two"
    );


let ticking = false;


const updateBackgroundPosition = () => {

    const scrollPosition =
        window.scrollY;


    if (glowOne) {

        glowOne.style.marginTop =
            `${scrollPosition * 0.025}px`;

    }


    if (glowTwo) {

        glowTwo.style.marginBottom =
            `${scrollPosition * 0.015}px`;

    }


    ticking = false;

};


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            requestAnimationFrame(
                updateBackgroundPosition
            );

            ticking = true;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   EFFET SUR LES CARTES COMPÉTENCES
   ========================================================= */

const skillCards =
    document.querySelectorAll(
        ".skill-logo"
    );


skillCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 850
            ) {
                return;
            }


            const rectangle =
                card.getBoundingClientRect();


            const mousePositionX =
                event.clientX -
                rectangle.left;


            const mousePositionY =
                event.clientY -
                rectangle.top;


            const rotateY =
                (
                    mousePositionX /
                    rectangle.width -
                    0.5
                ) * 4;


            const rotateX =
                (
                    mousePositionY /
                    rectangle.height -
                    0.5
                ) * -4;


            card.style.transform =
                `
                translateY(-4px)
                perspective(500px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   EFFET SUR LES CARTES PROJETS
   ========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            const projectCode =
                card.querySelector(
                    ".project-code"
                );


            if (projectCode) {

                projectCode.style.color =
                    "#ff7a00";

            }

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            const projectCode =
                card.querySelector(
                    ".project-code"
                );


            if (projectCode) {

                projectCode.style.color =
                    "";

            }

        }
    );

});


/* =========================================================
   FORMULAIRE
   ========================================================= */

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {

    const submitButton =
        contactForm.querySelector(
            ".form-button"
        );


    contactForm.addEventListener(
        "submit",
        () => {

            if (!submitButton) {
                return;
            }


            submitButton.innerHTML =
                `
                Envoi en cours...
                <span>→</span>
                `;

        }
    );

}


/* =========================================================
   AJUSTEMENT MENU AU REDIMENSIONNEMENT
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850 &&
            siteHeader &&
            menuButton
        ) {

            siteHeader
                .classList
                .remove("open");


            menuButton
                .classList
                .remove("active");


            document.body
                .classList
                .remove("menu-open");


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   PETIT EFFET DYNAMIQUE SUR LE TITRE DU PROFIL
   ========================================================= */

const profileSymbol =
    document.querySelector(
        ".profile-symbol"
    );


if (profileSymbol) {

    profileSymbol.addEventListener(
        "mouseenter",
        () => {

            profileSymbol.style.letterSpacing =
                "0.08em";

        }
    );


    profileSymbol.addEventListener(
        "mouseleave",
        () => {

            profileSymbol.style.letterSpacing =
                "";

        }
    );

}


/* =========================================================
   FIN
   ========================================================= */
