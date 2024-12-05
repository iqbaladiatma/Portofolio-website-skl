// Tunggu sampai DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Loader
  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
      setTimeout(function () {
        loader.style.display = "none";
      }, 2000);
    }
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
