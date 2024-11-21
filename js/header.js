document.addEventListener("DOMContentLoaded", function () {
    const bootstrapScriptId = "importBootstrap";
    const headElement = document.head;

    if (!document.getElementById(bootstrapScriptId)) {
        const bootstrapScript = document.createElement("script");
        bootstrapScript.id = bootstrapScriptId; 
        bootstrapScript.defer = true; 
        bootstrapScript.src = "js/importBootstrap.js"; 
        headElement.appendChild(bootstrapScript);
    }

    const headerElement = document.createElement("header");

    headerElement.id = "header";

    document.body.prepend(headerElement);

    fetch("components/header.html")
        .then((response) => response.text())
        .then((data) => {
            headerElement.innerHTML = data; 
        })
        .catch((error) => console.error("Error loading header:", error));

    const links = [
        {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
            rel: "stylesheet",
            integrity:
                "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
            crossorigin: "anonymous",
        },
        { href: "css/all.min.css", rel: "stylesheet" },
        { href: "css/fontawesome.min.css", rel: "stylesheet" },
    ];

    links.forEach(({ href, rel, integrity, crossorigin }) => {
        const linkElement = document.createElement("link");
        linkElement.href = href;
        linkElement.rel = rel;
        if (integrity) linkElement.integrity = integrity;
        if (crossorigin) linkElement.crossOrigin = crossorigin;
        headElement.appendChild(linkElement);
    });
});
