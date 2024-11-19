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

    // Add CSS links to the <head>
    const headElement = document.head;

    // List of links to be added
    const links = [
        {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
            rel: "stylesheet",
            integrity: "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
            crossorigin: "anonymous"
        },
        { href: "css/all.min.css", rel: "stylesheet" },
        { href: "css/fontawesome.min.css", rel: "stylesheet" }
    ];

    // Dynamically add each link
    links.forEach(({ href, rel, integrity, crossorigin }) => {
        const linkElement = document.createElement("link");
        linkElement.href = href;
        linkElement.rel = rel;
        if (integrity) linkElement.integrity = integrity;
        if (crossorigin) linkElement.crossOrigin = crossorigin;
        headElement.appendChild(linkElement);
    });
});
