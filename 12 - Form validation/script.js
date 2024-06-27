const formEl = document.querySelector(".form");
const messageEl = document.querySelector(".message");

const ValidatePasswords = () => {
  if (formEl.password1.value !== formEl.password2.value) {
    messageEl.textContent = "Passwords doesn't match";

    [formEl.password1, formEl.password2, messageEl].forEach((ele) =>
      ele.classList.add("invalid")
    );
    messageEl.style.background = "var(--color-invalid)";
    messageEl.style.color = "#f3f3f3";
  } else {
    messageEl.textContent = "Succesfully Registered";

    [formEl.password1, formEl.password2, messageEl].forEach((ele) =>
      ele.classList.remove("invalid")
    );
    messageEl.style.background = "var(--color-valid)";
    messageEl.style.color = "#f3f3f3";
  }
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  ValidatePasswords();
});
