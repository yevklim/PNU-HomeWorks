createGallery(
    ["img1.png", "img2.png", "img3.jpg"],
    document.getElementById("gallery-img"),
    document.getElementById("prev"),
    document.getElementById("next"),
);

function createGallery(imgs, img, prev, next) {
    let index = 0;

    if (!Array.isArray(imgs)) {
        imgs = [];
    }

    setImage(0);

    prev.addEventListener("click", () => {
        const prevIndex = index === 0 ? imgs.length - 1 : index - 1;
        setImage(prevIndex);
    });
    next.addEventListener("click", () => {
        const nextIndex = index === imgs.length - 1 ? 0 : index + 1;
        setImage(nextIndex);
    });

    function setImage(i) {
        index = i;
        img.src = imgs[i];
    }
}