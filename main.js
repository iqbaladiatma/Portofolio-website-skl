document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const mobileNav = document.querySelector('.nav-links');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    let isOpen = false;

    // Loader
    window.addEventListener("load", function () {
        const loader = document.getElementById("loader");
        if (loader) {
            setTimeout(function () {
                loader.style.display = "none";
            }, 2000);
        }
    });

    // Burger menu toggle
    burger.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (!isOpen) {
            // Menu Close
            mobileNav.style.transform = 'translateY(-100%)';
            // Reset burger animation
            line1.style.transform = 'rotate(0) translate(0, 0)';
            line2.style.opacity = '1';
            line3.style.transform = 'rotate(0) translate(0, 0)';
        } else {
            // Menu Open
            mobileNav.style.transform = 'translateY(0)';
            // Animate burger to X
            line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
            line2.style.opacity = '0';
            line3.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
    });

    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            mobileNav.style.transform = 'translateY(-100%)';
            // Reset burger animation
            line1.style.transform = 'rotate(0) translate(0, 0)';
            line2.style.opacity = '1';
            line3.style.transform = 'rotate(0) translate(0, 0)';
        });
    });

    // Form handling
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            // Form submission logic here
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });
});
