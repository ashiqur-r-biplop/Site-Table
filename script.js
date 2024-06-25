

 // Function to animate counters
 function animateCounter(element, start, end, duration) {
    let startTime = null;
    const step = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Callback function for intersection observer
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start counters when the section is visible
            const counters = document.querySelectorAll('.counter span');
            counters.forEach(counter => {
                const endValue = parseInt(counter.textContent);
                animateCounter(counter, 0, endValue, 2000);
            });
            // Unobserve the section after animation starts
            observer.unobserve(entry.target);
        }
    });
}

// Create intersection observer
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5 // Adjust this value as needed
});

// Observe the section
const target = document.querySelector('.Business-Software');
observer.observe(target);