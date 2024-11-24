var swiper = new Swiper(".watch-online__swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    speed: 1500,
    on: {
        setTranslate(swiper) {
            // Trigger when the slides are moving
            swiper.slides.forEach((slide) => {
                const info = slide.querySelector(".slide-info-wrapper");
                if (info) {
                    info.classList.add("hidden");
                }
            });
        },
    },
});

swiper.on("slideChange", () => {
    // Trigger when a slide settles into position
    const activeSlide = swiper.slides[swiper.activeIndex];
    const info = activeSlide.querySelector(".slide-info-wrapper");
    if (info) {
        info.classList.remove("hidden");
    }
});

