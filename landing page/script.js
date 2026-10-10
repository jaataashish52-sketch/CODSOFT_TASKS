
/* =====================================
   SEOWINS - LANDING PAGE JAVASCRIPT
   ===================================== */

// 1. MOBILE NAVIGATION MENU

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });

    // Close mobile menu when switching to desktop layout
    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        }
    });
}


// 2. CONTACT FORM DEMO

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check that the form fields are valid
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Show a demo message
        alert(
            "Thank you for your interest! This is a demo form. " +
            "No message has been sent. Connect a backend to receive submissions."
        );

        // Clear the form
        contactForm.reset();
    });
}


// 3. UPDATE FOOTER YEAR

const footerText = document.querySelector(".footer-bottom p");

if (footerText) {
    footerText.textContent =
        `© ${new Date().getFullYear()} SEOWINS. Landing page demo.`;
}


// 4. SMOOTH SCROLL FOR INTERNAL LINKS

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Update the URL hash without jumping
            history.replaceState(null, "", targetId);
        }
    });
});


// 5. CONSOLE MESSAGE

console.log("SEOWINS landing page loaded successfully!");
