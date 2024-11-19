const celebrityObjectsPath = "data/celebrities/";

// Function to populate celebrity cards
function populateCelebrityCards() {
    const celebrityListItems = document.querySelectorAll(
        ".celebrity-list-item[data-celebrity-id]"
    );
    const fetchPromises = [];

    celebrityListItems.forEach((listItem) => {
        const celebrityId = listItem.getAttribute("data-celebrity-id");
        const fetchPromise = fetch(`${celebrityObjectsPath}${celebrityId}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch celebrity data: ${celebrityId}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                listItem.innerHTML = `
                <div class="celebrity-card">
                    <div class="celebrity-image-wrapper">
                        <img src="${data.imgPath}" alt="" class="celebrity-image">
                    </div>
                    <div class="celebrity-text-wrapper">
                        <div class="firstname">${data.firstName}</div>
                        <div class="last">${data.lastName}</div>
                        <div class="age">${data.age}</div>
                    </div>
                </div>
                `;
            })
            .catch((error) => {
                console.error(
                    `Error loading info about celebrity (${celebrityId}):`,
                    error
                );
            });

        fetchPromises.push(fetchPromise);
    });

    return Promise.all(fetchPromises); // Return a promise that resolves when all fetches are complete
}

// Function to initialize LightSlider
function initializeLightSlider() {
    $(".lightSlider").lightSlider({
        loop: true,
        pager: false,
        item: 6,
        responsive: [
            {
                breakpoint: 2200,
                settings: { item: 6 },
            },
            {
                breakpoint: 1400,
                settings: { item: 6 },
            },
            {
                breakpoint: 1242,
                settings: { item: 5 },
            },
            {
                breakpoint: 992,
                settings: { item: 4 },
            },
            {
                breakpoint: 768,
                settings: { item: 3 },
            },
            {
                breakpoint: 576,
                settings: { item: 2 },
            },
        ],
    });
}

// Main logic
$(document).ready(function () {
    populateCelebrityCards()
        .then(() => {
            console.log("Celebrity cards have been populated.");
            initializeLightSlider(); // Initialize LightSlider after the cards are populated
        })
        .catch((error) => {
            console.error(
                "An error occurred while populating celebrity cards:",
                error
            );
        });

    // Reinitialize LightSlider on fullscreen changes
    $(document).on(
        "fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",
        function () {
            initializeLightSlider();
        }
    );
});
