document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const mobileNav = document.querySelector('.nav-links');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    const navbar = document.getElementById('navbar');
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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(37, 99, 235, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(37, 99, 235, 0.3)';
        } else {
            navbar.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    });

    // Burger menu toggle
    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            isOpen = !isOpen;
            
            if (!isOpen) {
                // Menu Close
                mobileNav.style.transform = 'translateY(-100%)';
                mobileNav.style.opacity = '0';
                // Reset burger animation
                if (line1) line1.style.transform = 'rotate(0) translate(0, 0)';
                if (line2) line2.style.opacity = '1';
                if (line3) line3.style.transform = 'rotate(0) translate(0, 0)';
            } else {
                // Menu Open
                mobileNav.style.transform = 'translateY(0)';
                mobileNav.style.opacity = '1';
                // Animate burger to X
                if (line1) line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (line2) line2.style.opacity = '0';
                if (line3) line3.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        });
    }

    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            if (mobileNav) {
                mobileNav.style.transform = 'translateY(-100%)';
                mobileNav.style.opacity = '0';
            }
            // Reset burger animation
            if (line1) line1.style.transform = 'rotate(0) translate(0, 0)';
            if (line2) line2.style.opacity = '1';
            if (line3) line3.style.transform = 'rotate(0) translate(0, 0)';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation for hero section
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const texts = [
            'Full Stack Developer',
            'UI/UX Designer', 
            'Problem Solver',
            'Tech Enthusiast'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }

    // Enhanced particle animation
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
            
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - particle.x;
                    const dy = mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        particle.vx += dx * force * 0.01;
                        particle.vy += dy * force * 0.01;
                    }
                }
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
        }

        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        // Mouse tracking
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Initialize
        resizeCanvas();
        createParticles();
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600, // Faster animation duration
            once: true,
            offset: 50, // Trigger animations earlier
            easing: 'ease-out-quart', // Snappier easing
            delay: 0 // No delay for faster response
        });
    }

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
