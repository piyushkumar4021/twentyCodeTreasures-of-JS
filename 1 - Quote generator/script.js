const quoteContainerEle = document.querySelector(".quote");
const quoteEle = document.querySelector(".quote__text");
const quoteAuthorEle = document.querySelector(".quote__author");
const btnNewQuote = document.querySelector(".btn-newQuote");
const btnTweet = document.querySelector(".btn-twitter");
const loadingEle = document.querySelector(".loader");

function showLoading() {
  loadingEle.classList.remove("hidden");
  quoteContainerEle.classList.add("hidden");
}
function hideLoading() {
  loadingEle.classList.add("hidden");
  quoteContainerEle.classList.remove("hidden");
}

const getQuote = () => {
  showLoading();
  setTimeout(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        quoteEle.innerText = data.content;
        quoteAuthorEle.innerText = data.author;
        hideLoading();
      });
  }, 1000);
};
getQuote();

btnNewQuote.addEventListener("click", () => {
  getQuote();
});

btnTweet.addEventListener("click", () => {
  window.open(
    `https://x.com/intent/post?text=${quoteEle.textContent}\n-${quoteAuthorEle.textContent}`
  );
});
