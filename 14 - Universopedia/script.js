const apiKey = `M3Q0BedUBmNec1PMOtoXmaQiM3k9RoztIiZ6wFFo`;
// const apiKey = `DEMO_KEY`;
const count = 3;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

const imagesContainerEl = document.querySelector(".images-container");
const loaderEl = document.querySelector(".loader");

const loadMoreBtn = document.querySelector(".btn-load-more");
const favoritesBtn = document.querySelector(".btn-favorites");
const homeBtn = document.querySelector(".btn-home");

const favorites = JSON.parse(localStorage.getItem("favorites")) ?? {};
const resultsArray = Object.values(favorites) ?? [];

const renderImages = (dataArray, page = "home") => {
  if (page === "favorites" && dataArray.length == 0)
    imagesContainerEl.insertAdjacentHTML(
      "afterbegin",
      `<p class="text-center fs-2 m-5">There are no favorites.</p>`
    );

  dataArray.forEach((data) =>
    imagesContainerEl.insertAdjacentHTML(
      "beforeend",
      `<div class="card mb-3 bg-light-subtle" data-id=${data.url}>
      <img
        src=${data.url}
        class="card-img-top"
        alt=${data.title}
      />

      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">
          <small class="text-body-secondary">${data.date}</small>
        </p>
        <p class="card-text">${data.explanation}</p>

        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary 
          btn-${page === "home" ? "add" : "remove"}-favorite
          ">
          ${page === "home" ? "Add to favorites" : "Added ✔"}
          </button>
        </div>
      </div>
    </div>`
    )
  );
  loaderEl.style.opacity = "0";
};

const fetchImages = async () => {
  loaderEl.style.opacity = "1";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((dataArray) => {
      // dataArray.forEach((data) => (data.id = Date.now().toString()));

      resultsArray.push(...dataArray);
      renderImages(dataArray);
    });
};

fetchImages();

loadMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchImages();
});

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  imagesContainerEl.innerHTML = "";
  fetchImages();
  loadMoreBtn.hidden = false;
});

favoritesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  imagesContainerEl.innerHTML = "";
  loadMoreBtn.hidden = true;
  renderImages(Object.values(favorites), "favorites");
});

imagesContainerEl.addEventListener("click", (e) => {
  const clicked = e.target;

  const cardEl = clicked.closest(".card");
  clickedCardData = resultsArray.find((ele) => ele.url === cardEl.dataset.id);

  if (clicked.classList.contains("btn-add-favorite")) {
    clicked.classList.replace("btn-add-favorite", "btn-remove-favorite");
    clicked.textContent = "Added ✔";

    // Add to favorites array
    favorites[clickedCardData.url] = clickedCardData;
  }
  //
  else if (clicked.classList.contains("btn-remove-favorite")) {
    clicked.classList.replace("btn-remove-favorite", "btn-add-favorite");
    clicked.textContent = "Add to favorites";

    // Remove from favorites array
    delete favorites[clickedCardData.url];
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
});
