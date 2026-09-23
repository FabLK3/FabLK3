// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");
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


// Détection de la section actuellement visible
const sections = document.querySelectorAll("main section");
const menuLinks = document.querySelectorAll(".menu a");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (!entry.isIntersecting) {
            return;
        }

        menuLinks.forEach(function (link) {
            link.classList.remove("active");
        });

        const activeLink = document.querySelector(
            '.menu a[href="#' + entry.target.id + '"]'
        );

        if (activeLink) {
            activeLink.classList.add("active");
        }

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});


sections.forEach(function (section) {
    observer.observe(section);
});


console.log("Portfolio BTS SIO chargé.");
