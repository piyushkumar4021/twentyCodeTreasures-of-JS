const bookmarks = document.querySelector(".bookmarks");

const modal = document.querySelector(".modal");
const websiteName = document.querySelector("#site-name");
const websiteUrl = document.querySelector("#site-url");
const form = document.querySelector(".form");

const btnshowModal = document.querySelector(".btn-bookmark");
const btncloseModal = document.querySelector(".close-modal");
const btnAddBookmark = document.querySelector(".btn-submit");
const btnsDeleteBookmark = document.querySelectorAll(".delete-bookmark");

let bookmarksData = JSON.parse(localStorage.getItem("savedBookmarks")) ?? [];

const toggleModal = () => modal.classList.toggle("show-modal");

// Opening Modal Window
btnshowModal.addEventListener("click", () => {
  toggleModal();
  websiteName.focus();
});

// Closing Modal Window
btncloseModal.addEventListener("click", toggleModal);
document.addEventListener(
  "keydown",
  (e) => e.code === "Escape" && toggleModal()
);
modal.addEventListener(
  "click",
  (e) => e.target.classList.contains("modal") && toggleModal()
);

const validateUrl = (url) =>
  ["http://", "https://"].some((str) => url.includes(str))
    ? url
    : "https://" + url;

// Adding a Bookmark
const addBookmark = function (bookmark) {
  const { name, url, id } = bookmark;

  bookmarks.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="bookmark" data-id="${id}">
        <i class="bi bi-x delete-bookmark"></i>
        
        <a class="bookmark__url" href="${validateUrl(url)}" target="_blank">
        <img
          src="http://www.google.com/s2/favicons?domain=${url}"
          alt="Bookmark Favicon"
          class="bookmark__favicon"
        />
        ${name}</a>
      </div>
    `
  );
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = websiteName.value;
  const url = websiteUrl.value;
  const id = Date.now();

  addBookmark({ id, name, url });

  bookmarksData.push({ id, name, url });
  localStorage.setItem("savedBookmarks", JSON.stringify(bookmarksData));

  toggleModal();

  websiteName.value = "";
  websiteUrl.value = "";
});

// Deleting a Bookmark
bookmarks.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-bookmark")) return;

  const bookmark = e.target.closest(".bookmark");

  bookmarksData = bookmarksData.filter((b) => b.id !== +bookmark.dataset.id);
  localStorage.setItem("savedBookmarks", JSON.stringify(bookmarksData));

  bookmark.remove();
});

bookmarksData.forEach((bookmark) => addBookmark(bookmark));
