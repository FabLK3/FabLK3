/* =========================================================
   PORTFOLIO FABJO LAMI
   ========================================================= */


/* =========================================================
   ANNÉE FOOTER
   ========================================================= */

const footerYear =
    document.getElementById(
        "footer-year"
    );


if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   MENU MOBILE
   ========================================================= */

const siteHeader =
    document.querySelector(
        ".site-header"
    );


const menuButton =
    document.querySelector(
        ".menu-button"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


if (
    siteHeader &&
    menuButton
) {


    menuButton.addEventListener(
        "click",
        () => {


            const opened =
                siteHeader
                    .classList
                    .toggle("open");


            menuButton
                .classList
                .toggle(
                    "active",
                    opened
                );


            document.body
                .classList
                .toggle(
                    "menu-open",
                    opened
                );


            menuButton.setAttribute(
                "aria-expanded",
                String(opened)
            );


        }
    );


}



/* =========================================================
   FERMER MENU APRÈS CLIC
   ========================================================= */

navLinks.forEach(
    link => {


        link.addEventListener(
            "click",
            () => {


                if (!siteHeader) {

                    return;

                }


                siteHeader
                    .classList
                    .remove("open");


                if (menuButton) {


                    menuButton
                        .classList
                        .remove("active");


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }


                document.body
                    .classList
                    .remove(
                        "menu-open"
                    );


            }
        );


    }
);



/* =========================================================
   CURSEUR
   ========================================================= */

const cursor =
    document.querySelector(
        ".cursor"
    );


const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );


let mouseX =
    window.innerWidth / 2;


let mouseY =
    window.innerHeight / 2;


let cursorX =
    mouseX;


let cursorY =
    mouseY;



if (
    cursor &&
    cursorDot
) {


    window.addEventListener(
        "mousemove",
        event => {


            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            cursorDot.style.left =
                `${mouseX}px`;


            cursorDot.style.top =
                `${mouseY}px`;


        }
    );



    const animateCursor =
        () => {


            cursorX +=
                (
                    mouseX -
                    cursorX
                ) * 0.18;


            cursorY +=
                (
                    mouseY -
                    cursorY
                ) * 0.18;


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
   CURSEUR AU SURVOL
   ========================================================= */

const interactiveElements =
    document.querySelectorAll(
        `
        a,
        button,
        input,
        textarea,
        .skill-item,
        .tool-item,
        .project-card
        `
    );


interactiveElements.forEach(
    element => {


        element.addEventListener(
            "mouseenter",
            () => {


                if (cursor) {

                    cursor
                        .classList
                        .add("hover");

                }


            }
        );


        element.addEventListener(
            "mouseleave",
            () => {


                if (cursor) {

                    cursor
                        .classList
                        .remove("hover");

                }


            }
        );


    }
);



/* =========================================================
   APPARITION DES SECTIONS
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {


    const revealObserver =
        new IntersectionObserver(

            entries => {


                entries.forEach(
                    entry => {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );


                        }


                    }
                );


            },

            {

                threshold: 0.1,

                rootMargin:
                    "0px 0px -40px 0px"

            }

        );



    revealElements.forEach(
        element => {


            revealObserver.observe(
                element
            );


        }
    );


}
else {


    revealElements.forEach(
        element => {


            element
                .classList
                .add("visible");


        }
    );


}



/* =========================================================
   SECTION ACTIVE DANS MENU
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const updateActiveNavigation =
    sectionId => {


        navLinks.forEach(
            link => {


                const href =
                    link.getAttribute(
                        "href"
                    );


                link
                    .classList
                    .toggle(
                        "active",
                        href ===
                        `#${sectionId}`
                    );


            }
        );


    };



if (
    "IntersectionObserver"
    in window
) {


    const navigationObserver =
        new IntersectionObserver(

            entries => {


                entries.forEach(
                    entry => {


                        if (
                            entry.isIntersecting
                        ) {


                            updateActiveNavigation(
                                entry.target.id
                            );


                        }


                    }
                );


            },

            {

                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0

            }

        );


    sections.forEach(
        section => {


            navigationObserver
                .observe(section);


        }
    );


}



/* =========================================================
   SCROLL DOUX
   ========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(
    link => {


        link.addEventListener(
            "click",
            event => {


                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView(
                    {

                        behavior:
                            "smooth",

                        block:
                            "start"

                    }
                );


            }
        );


    }
);



/* =========================================================
   RETOUR EN HAUT
   ========================================================= */

const backToTop =
    document.querySelector(
        ".back-to-top"
    );


const updateBackToTop =
    () => {


        if (!backToTop) {

            return;

        }


        backToTop
            .classList
            .toggle(
                "visible",
                window.scrollY > 500
            );


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
   FOND LÉGÈREMENT DYNAMIQUE
   ========================================================= */

const lightOne =
    document.querySelector(
        ".background-light-one"
    );


const lightTwo =
    document.querySelector(
        ".background-light-two"
    );


let scrollAnimationRunning =
    false;


const updateBackground =
    () => {


        const scrollY =
            window.scrollY;


        if (lightOne) {


            lightOne.style.marginTop =
                `${scrollY * 0.02}px`;


        }


        if (lightTwo) {


            lightTwo.style.marginBottom =
                `${scrollY * 0.012}px`;


        }


        scrollAnimationRunning =
            false;


    };


window.addEventListener(
    "scroll",
    () => {


        if (
            !scrollAnimationRunning
        ) {


            scrollAnimationRunning =
                true;


            requestAnimationFrame(
                updateBackground
            );


        }


    },
    {
        passive: true
    }
);



/* =========================================================
   FERMER LE MENU MOBILE EN CLIQUANT EN DEHORS
   ========================================================= */

document.addEventListener(
    "click",
    event => {


        if (
            !siteHeader ||
            !menuButton ||
            window.innerWidth > 800
        ) {

            return;

        }


        const clickInsideMenu =
            siteHeader.contains(
                event.target
            );


        const clickOnButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickInsideMenu &&
            !clickOnButton &&
            siteHeader
                .classList
                .contains("open")
        ) {


            siteHeader
                .classList
                .remove("open");


            menuButton
                .classList
                .remove("active");


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            document.body
                .classList
                .remove(
                    "menu-open"
                );


        }


    }
);



/* =========================================================
   REDIMENSIONNEMENT
   ========================================================= */

window.addEventListener(
    "resize",
    () => {


        if (
            window.innerWidth > 800
        ) {


            if (siteHeader) {


                siteHeader
                    .classList
                    .remove("open");


            }


            if (menuButton) {


                menuButton
                    .classList
                    .remove("active");


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


            }


            document.body
                .classList
                .remove(
                    "menu-open"
                );


        }


    }
);



/* =========================================================
   FORMULAIRE
   ========================================================= */

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {


    const formButton =
        contactForm
            .querySelector(
                ".form-button"
            );


    contactForm.addEventListener(
        "submit",
        () => {


            if (!formButton) {

                return;

            }


            formButton.innerHTML =
                `
                Envoi en cours
                <span>→</span>
                `;


        }
    );


}
