// JavaScript to load header into the DOM
document.addEventListener("DOMContentLoaded", function () {
    fetch("components/header.html") // Path to the header HTML component
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header").innerHTML = data; // Inject into the DOM
        })
        .catch((error) => console.error("Error loading header:", error));
});
