function setAspectRatio(img) {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    document.documentElement.style.setProperty("--aspect-ratio", aspectRatio);
}

// Get the article ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article"); // e.g., ?article=article1

// Function to load the article content from JSON
function loadArticle(articleId) {
    console.log(articleId);
    fetch(`data/articles/${articleId}-Article.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Populate the article page with the data from the JSON file
            document.querySelector("#article-page").innerHTML = `
                <div class="background-container">
                    <img src="${data.ImgPath}" class="background-image" data-article-id="${articleId}"/>
                </div>
                <div class="article-container">
                    <div class="container article-content">
                        <h1 id="headline">${data.Headline}</h1>
                        <div id="article-content">${data.TextContent}</div>
                    </div>
                </div>
            `;

            // Ensure the image is ready before setting the aspect ratio
            const img = document.querySelector(".background-image");
            if (img.complete) {
                setAspectRatio(img);
            } else {
                img.onload = () => setAspectRatio(img);
            }
        })
        .catch((error) => console.error("Error loading article:", error));
}

// Load the article based on the URL parameter
if (articleId) {
    loadArticle(articleId);
} else {
    console.log("No article specified in the URL");
}
