const projectObjectsPath = "data/projects/";

// const posterSizes = [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original",
// ];

const chosenSize = "w342";
const posterKey = `poster_path_${chosenSize}_local`

const populateMovieCards = () => {
    const projectCards = document.querySelectorAll(".movie-card");

    projectCards.forEach((card) => {
        const projectId = card.dataset.projectId;

        fetch(`${projectObjectsPath}${projectId}/${projectId}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch project object: ${projectId}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                card.innerHTML = `
                    <img
                        src="${data[posterKey]}"
                        alt="${data.title}"
                        class="movie-card__poster"
                    />
                    <p class="movie-card__title">
                        ${data.title}
                    </p>
                `;
                card.dataset.projectTitle = data.title;
            })
            .catch((error) => {
                console.error(`Error loading project (${projectId}):`, error);
            });
    });
};

document.addEventListener("DOMContentLoaded", populateMovieCards);

document.addEventListener("DOMContentLoaded", function () {
    const mediaScrollers = document.querySelectorAll(".media-scroller");

    // Function to handle scroll behavior for each media scroller
    const handleScroll = (mediaScroller) => {
        const mediaScrollerWrapper = mediaScroller.closest(
            ".media-scroller-wrapper"
        );

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
            return (
                mediaScroller.offsetWidth + mediaScroller.scrollLeft + 10 >=
                mediaScroller.scrollWidth
            );
        }
    };

    // Apply the handleScroll function to each media scroller
    mediaScrollers.forEach(handleScroll);
});
