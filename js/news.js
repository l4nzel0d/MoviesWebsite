const articlesPath = "data/articles/";
const newsArticleUrl = "news-article.html";

function populateNewsCards() {
    const newsCards = document.querySelectorAll(".news-card[article-id]");

    newsCards.forEach((card) => {
        const articleId = card.getAttribute("article-id");

        fetch(`${articlesPath}${articleId}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch article: ${articleId}`);
                }
                return response.json();
            })
            .then((data) => {
                card.innerHTML = `
                    <div class="news-card-image-portion">
                        <img src="${data.ImgPath}" alt="${data.Headline}" />
                    </div>
                    <div class="news-card-headline-portion">
                        <h3>
                            ${data.Headline}
                        </h3>
                    </div>            
                `;
                card.href = `${newsArticleUrl}?article=${articleId}`;
            })
            .catch((error) => {
                console.error(`Error loading article (${articleId}):`, error);
            });
    });
}

document.addEventListener("DOMContentLoaded", populateNewsCards);
