// Initialize AOS for scroll animations
AOS.init({
  once: true,
  offset: 200,
});

document.addEventListener("DOMContentLoaded", () => {
  // Function to animate the progress bar to the specified width
  const animateProgressBar = (progressSpan, targetWidth) => {
    let currentWidth = 0;
    const increment = targetWidth / 100; // Calculate increment for smoother animation

    const animate = () => {
      if (currentWidth < targetWidth) {
        currentWidth += increment; // Increase width by the increment value
        progressSpan.style.width = `${Math.min(currentWidth, targetWidth)}%`; // Cap width at targetWidth
        requestAnimationFrame(animate); // Call animate for the next frame
      }
    };

    requestAnimationFrame(animate); // Start the animation
  };

  // Intersection Observer callback
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetWidth = parseInt(
          entry.target.getAttribute("data-progress"),
          10
        );
        animateProgressBar(entry.target, targetWidth);
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };

  // Options for the observer (which part of the item should be visible)
  const observerOptions = {
    threshold: 0.6, // 60% of the item must be visible
  };

  // Instantiate the observer with the callback and options
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Select all progress spans with the class 'progress'
  const progressSpans = document.querySelectorAll(".progress-bar .progress");

  // Observe each progress span
  progressSpans.forEach((span) => {
    observer.observe(span);
  });
});

// JavaScript for Project Carousel
document.addEventListener("DOMContentLoaded", (event) => {
  // Function to show a specific slide
  window.currentSlide = (n) => {
    var i;
    var slides = document.getElementsByClassName("project");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      n = 1;
    }
    if (n < 1) {
      n = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[n - 1].style.display = "flex"; // Assuming flex display
    dots[n - 1].className += " active";
  };

  // Attach click event to dots
  let dots = document.querySelectorAll(".slider-nav .dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => currentSlide(index + 1));
  });

  // Initialize the first project as active
  currentSlide(1);
});
