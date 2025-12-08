document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".animated-image");
    // console.log("Animated images found:", images.length);

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("Animating:", entry.target);
                    entry.target.classList.add("visible");
                    // Stop observing once it's animated
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 } // triggers when 20% of the image is visible
    );

    images.forEach((img) => observer.observe(img));
});
