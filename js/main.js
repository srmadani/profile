document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('.nav-menu a, .scroll-down');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal link on the same page
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    // Use getBoundingClientRect for accurate position relative to viewport
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    // Calculate final scroll position considering page scroll and header height
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 15; // Extra 15px padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Briefly highlight the section
                    // targetElement.style.transition = 'box-shadow 0.3s ease-in-out';
                    // targetElement.style.boxShadow = '0 0 0 3px rgba(var(--primary-color-rgb), 0.3)'; // Use primary color RGBA
                    // setTimeout(() => {
                    //     targetElement.style.boxShadow = 'none';
                    // }, 1000);
                }
            }
            // If it's a link to another page's anchor (not applicable here anymore, but good practice)
            // else if (href && href.includes('.html#')) {
                 // Default browser behavior will handle navigation.
                 // Add mobile menu closing logic here if needed in the future.
            // }
        });
    });

    // Project Card Interactions (Learn More/Collapse)
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        const collapseBtn = card.querySelector('.collapse-btn');
        const detailsDiv = card.querySelector('.project-details');

        // Ensure all elements exist before adding listeners
        if (learnMoreBtn && collapseBtn && detailsDiv) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                detailsDiv.style.display = 'block'; // Show details
                // Optional: Add class for animation
                // detailsDiv.classList.add('visible');
                learnMoreBtn.style.display = 'none'; // Hide Learn More button
                collapseBtn.style.display = 'inline-block'; // Show Collapse button
            });

            collapseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                detailsDiv.style.display = 'none'; // Hide details
                // Optional: Remove class for animation
                // detailsDiv.classList.remove('visible');
                collapseBtn.style.display = 'none'; // Hide Collapse button
                learnMoreBtn.style.display = 'inline-block'; // Show Learn More button again
            });

            // Initial setup: Hide details and collapse button
            detailsDiv.style.display = 'none';
            collapseBtn.style.display = 'none';
            learnMoreBtn.style.display = 'inline-block'; // Ensure Learn More is visible initially
        }
    });


    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Fade-in effect for sections
    const sections = document.querySelectorAll('section'); // Target sections
    const options = {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px 0px -50px 0px" // Trigger a bit earlier
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            // Add a class to trigger animation defined in CSS
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target); // Stop observing once animated
        });
    }, options);

    sections.forEach(section => {
         section.classList.add('fade-in-section'); // Add base class for initial state
         observer.observe(section);
    });

});