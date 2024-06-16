const totalPages = 33;
const usedPages = new Set();
const imageContainer = document.querySelector(".images");

const randomPageNumber = () => {
  const randomPage = Math.floor(Math.random() * totalPages);

  if (usedPages.has(randomPage)) return randomPageNumber();

  usedPages.add(randomPage);
  return randomPage;
};

const createImageElement = (attributes) => {
  const imageElement = document.createElement("img");
  for (let key in attributes) imageElement.setAttribute(key, attributes[key]);
  return imageElement;
};

let imagesLoaded = 0,
  loadMoreImages = false;

const checkLoadingImages = (e) => {
  imagesLoaded++;
  e.target.removeEventListener("load", checkLoadingImages);

  if (imagesLoaded != 30) return;
  imagesLoaded = 0;
  loadMoreImages = true;
};

const renderImages = () => {
  try {
    loadMoreImages = false;
    fetch(`https://picsum.photos/v2/list?page=${randomPageNumber()}&limit=30`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((image) => {
          const imageEle = createImageElement({
            class: "image",
            title: `Author : ${image.author}`,
            src: image.download_url,
            alt: "a random image",
          });
          imageContainer.insertAdjacentElement("beforeend", imageEle);
          imageEle.addEventListener("load", checkLoadingImages);
        });
      });
  } catch (error) {
    console.log(error);
  }
};

renderImages();

// Load more images if user scrolled enough
window.addEventListener("scroll", () => {
  if (window.scrollY > document.body.offsetHeight - 1500 && loadMoreImages)
    renderImages();
});
