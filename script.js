// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});


// Petit effet sur le menu selon la section affichée
const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".menu a");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            menuLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                '.menu a[href="#' + entry.target.id + '"]'
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

}, {
    threshold: 0.35
});


sections.forEach(function (section) {
    observer.observe(section);
});


// Message dans la console
console.log("Portfolio BTS SIO chargé.");
