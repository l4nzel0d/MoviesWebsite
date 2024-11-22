document.addEventListener("DOMContentLoaded", function() {
    const mediaScroller = document.querySelector(".media-scroller");
    const mediaScrollerWrapper = document.querySelector(".media-scroller-wrapper");

    
    mediaScroller.addEventListener("scroll", checkScroll);
    
    checkScroll();

    function checkScroll() {
        console.log("checkScroll invoked");
        
        const isScrolledToRight = mediaScroller.offsetWidth + mediaScroller.scrollLeft >= mediaScroller.scrollWidth;
        if (isScrolledToRight) {
            mediaScrollerWrapper.classList.add("hidden");
        } else {
            mediaScrollerWrapper.classList.remove("hidden");
        }
    }
});
