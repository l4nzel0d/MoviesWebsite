document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector(".background-image");

    if (img.complete) {
        setAspectRatio(img);
    } else {
        img.onload = () => setAspectRatio(img);
    }
});

function setAspectRatio(img) {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    document.documentElement.style.setProperty('--aspect-ratio', aspectRatio);
}
