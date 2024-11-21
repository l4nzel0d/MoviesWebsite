document.addEventListener("DOMContentLoaded", () => {
    initializeButtons();
});

const initializeButtons = () => {
    const formMainPage = document.getElementById("form-main-page");
    const mainPageButtons = formMainPage.querySelectorAll(
        ".sign-in-form-button"
    );

    const formSecondPage = document.getElementById("form-second-page");
    const goBackButton = document.getElementById("go-back-button");

    goBackButton.addEventListener("click", () => {
        formSecondPage.style.display = "none";
        formMainPage.style.display = "block";
    });

    mainPageButtons.forEach((button) =>
        button.addEventListener("click", () => {
            formMainPage.style.display = "none";
            formSecondPage.style.display = "flex";
        })
    );
};

window.addEventListener("focusout", function () {
    if (window.innerHeight < document.documentElement.clientHeight) {
        window.scrollTo(0, 0);
    }
});
