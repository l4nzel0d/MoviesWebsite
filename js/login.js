const form = document.querySelector("form");
const emailAndPasswordSection = form.querySelector(
    ".email-and-password-section-wrapper"
);

form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", () => {
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
});
