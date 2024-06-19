const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

// Change Light / Dark Mode
function darkMode(darkMode) {
  nav.style.backgroundColor = `rgb(${
    darkMode ? "0 0 0" : "255 255 255"
  } / 50%)`;
  textBox.style.backgroundColor = `rgb(${
    darkMode ? "255 255 255" : "0 0 0"
  } / 50%)`;

  toggleIcon.children[0].textContent = `${darkMode ? "Dark" : "Light"} Mode`;
  toggleIcon.children[1].classList.replace(
    `fa-${darkMode ? "sun" : "moon"}`,
    `fa-${darkMode ? "moon" : "sun"}`
  );

  image1.src = `undraw_1_${darkMode ? "dark" : "light"}.svg`;
  image2.src = `undraw_2_${darkMode ? "dark" : "light"}.svg`;
  image3.src = `undraw_3_${darkMode ? "dark" : "light"}.svg`;
}

// Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkMode(true);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    darkMode(false);
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode(true);
  }
}
