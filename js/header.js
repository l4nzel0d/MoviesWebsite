document.addEventListener("DOMContentLoaded", function () {
    // Create a new <header> element
    const headerElement = document.createElement("header");
    
    // Add an ID to the header for styling or identification if needed
    headerElement.id = "header";
    
    // Insert the header at the top of the <body>
    document.body.prepend(headerElement);

    // Fetch the header content and populate the new <header> element
    fetch("components/header.html")
        .then((response) => response.text())
        .then((data) => {
            headerElement.innerHTML = data; // Add content to the new header
        })
        .catch((error) => console.error("Error loading header:", error));
});
