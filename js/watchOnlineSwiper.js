var swiper = new Swiper(".watch-online__swiper", {
    slidesPerView: 1,
    spaceBetween: -1,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});