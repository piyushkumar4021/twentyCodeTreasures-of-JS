const form = document.querySelector(".form");
const inputNote = document.querySelector(".input-note");
const notes = document.querySelector(".notes");

let notesList = JSON.parse(localStorage.getItem("notesList")) ?? [];

const addNote = ({ note, id }) => {
  notes.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="note" data-id="${id}">
        ${note}
        <button class="btn btn-delete"><i class="bi bi-trash3"></i></button>
      </div>
    `
  );
};

notesList.forEach((note) => addNote(note));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const note = inputNote.value;
  const id = Date.now().toString();

  inputNote.value = "";

  notesList.push({ id, note });
  localStorage.setItem("notesList", JSON.stringify(notesList));

  addNote({ note, id });
});

notes.addEventListener("click", (e) => {
  if (!e.target.classList.contains("bi-trash3")) return;
  const element = e.target.closest(".note");

  notesList = notesList.filter((note) => note.id !== element.dataset.id);
  localStorage.setItem("notesList", JSON.stringify(notesList));

  element.remove();
});
