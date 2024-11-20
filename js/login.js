const form = document.querySelector("form");
const emailAndPasswordSection = form.querySelector(
    ".email-and-password-section-wrapper"
);

form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
    }

    emailAndPasswordSection.classList.add("was-validated");
});