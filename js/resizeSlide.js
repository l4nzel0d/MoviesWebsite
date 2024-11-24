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

        // Set the height of each slide
        slides.forEach(slide => {
            slide.style.height = `${swiperHeight}px`;
        });

        // Set the height of each backdrop
        backdrops.forEach(backdrop => {
            backdrop.style.height = `${swiperHeight}px`;
        });

        console.log(`Updated heights to: ${swiperHeight}px`);
    } else {
        console.error('.watch-online__swiper not found.');
    }
}

// Invoke the function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", adjustSwiperHeights);

// Re-invoke the function on window resize
window.addEventListener("resize", adjustSwiperHeights);
