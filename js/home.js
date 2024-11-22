document.addEventListener("DOMContentLoaded", function () {
    const mediaScroller = document.querySelector(".media-scroller");
    const mediaScrollerWrapper = document.querySelector(".media-scroller-wrapper");

    let isScrolling; // Variable to track scrolling state

    mediaScroller.addEventListener("scroll", function () {
        // Always check if the scroll has reached the end
        if (isScrolledToEnd()) {
            mediaScrollerWrapper.classList.add("hidden");
        } else {
            mediaScrollerWrapper.classList.remove("hidden");
        }

        // Add the "hidden" class during scrolling
        mediaScrollerWrapper.classList.add("hidden");

        // Clear the timeout if it exists
        clearTimeout(isScrolling);

        // Set a timeout to remove the "hidden" class after scrolling ends
        isScrolling = setTimeout(() => {
            // Remove the "hidden" class only if not scrolled to the end
            if (!isScrolledToEnd()) {
                mediaScrollerWrapper.classList.remove("hidden");
            }
        }, 150); // Adjust delay as needed
    });

    // Returns true if the scroll is at the end
    function isScrolledToEnd() {
        return mediaScroller.offsetWidth + mediaScroller.scrollLeft + 10 >= mediaScroller.scrollWidth;
    }
});
