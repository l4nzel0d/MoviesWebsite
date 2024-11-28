const initializeButtons = () => {
    const formMainPage = document.getElementById("form-main-page");
    const formSecondPage = document.getElementById("form-second-page");
    const mainPageButtons = formMainPage.querySelectorAll(".sign-in-form-button");
    const goBackButton = document.getElementById("go-back-button");

    // Function to toggle visibility of form pages
    const showPage = (pageToShow, pageToHide) => {
        pageToShow.classList.remove("is-hidden");
        pageToShow.classList.add("is-visible");

        pageToHide.classList.remove("is-visible");
        pageToHide.classList.add("is-hidden");
    };

    goBackButton.addEventListener("click", () => {
        showPage(formMainPage, formSecondPage);
    });

    mainPageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showPage(formSecondPage, formMainPage);
        });
    });
};

window.addEventListener("focusout", function () {
    if (window.innerHeight < document.documentElement.clientHeight) {
        window.scrollTo(0, 0);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Initialize buttons for navigation
    initializeButtons();
});
