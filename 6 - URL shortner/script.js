const apiUrl = "https://spoo.me/";

const inputUrl = document.getElementById("input-url");
const btnSubmit = document.querySelector(".btn-submit");

const loader = document.querySelector(".loader");

const shortenedUrlContainer = document.querySelector(".shorten-url");
const textareaUrl = document.querySelector(".textarea-url");
const btnCopyUrl = document.querySelector(".bi-clipboard");
const btnCopiedUrl = document.querySelector(".bi-clipboard-fill");

const form = document.querySelector(".form");

const toggleLoader = () => {
  form.classList.toggle("hidden");
  shortenedUrlContainer.classList.toggle("hidden");
  loader.hidden = !loader.hidden;
};

const renderUrl = (url) => {
  shortenedUrlContainer.classList.remove("hidden");

  btnCopyUrl.classList.remove("hidden");
  btnCopiedUrl.classList.add("hidden");

  textareaUrl.value = url;
};

const getUrl = async (userUrl) => {
  const apiBody = new URLSearchParams();
  apiBody.append("url", userUrl);

  toggleLoader();

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: apiBody,
  })
    .then((response) =>
      response.ok ? response.json() : { short_url: "Error: invalid url" }
    )
    .then((data) => {
      toggleLoader();

      renderUrl(data.short_url);
    });
};

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  getUrl(inputUrl.value);

  inputUrl.value = "";
});

btnCopyUrl.addEventListener("click", (e) => {
  e.preventDefault();

  textareaUrl.select();
  try {
    if (!navigator.clipboard) throw new Error();
    navigator.clipboard.writeText(textareaUrl.value);
  } catch {
    document.execCommand("copy");
  }
});

shortenedUrlContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("bi")) return;

  [btnCopiedUrl, btnCopyUrl].forEach((btn) => btn.classList.toggle("hidden"));
});
