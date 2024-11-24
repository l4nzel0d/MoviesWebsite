function adjustSwiperHeights() {
    // Select the .watch-online__swiper element
    const swiper = document.querySelector('.watch-online__swiper');

    // Check if the element exists
    if (swiper) {
        // Get the computed height of the swiper
        const swiperHeight = swiper.offsetHeight;

        // Select all .watch-online__swiper-slide and .watch-online__swiper-slide-backdrop elements
        const slides = document.querySelectorAll('.watch-online__swiper-slide');
        const backdrops = document.querySelectorAll('.watch-online__swiper-slide-backdrop');

        // Check viewport width
        const viewportWidth = window.innerWidth;

        if (viewportWidth < 576) {
            // For viewports less than 576px, set explicit height
            slides.forEach(slide => {
                slide.style.height = `${swiperHeight}px`;
            });

            backdrops.forEach(backdrop => {
                backdrop.style.height = `${swiperHeight}px`;
            });

            console.log(`Updated heights for small viewport: ${swiperHeight}px`);
        } else {
            // For larger viewports, reset height to default (CSS-based)
            slides.forEach(slide => {
                slide.style.height = ''; // Removes inline style
            });

            backdrops.forEach(backdrop => {
                backdrop.style.height = ''; // Removes inline style
            });

            console.log('Reset heights to CSS defaults for large viewport.');
        }
    } else {
        console.error('.watch-online__swiper not found.');
    }
}

// Invoke the function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", adjustSwiperHeights);

// Re-invoke the function on window resize
window.addEventListener("resize", adjustSwiperHeights);
