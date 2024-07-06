const TabsContainer = document.querySelector(".head-items");
const allAddBtns = document.querySelectorAll(".btn-add");
const allSaveBtns = document.querySelectorAll(".btn-save");
const allTextAreas = document.querySelectorAll(".textarea");

const backlogTab = document.querySelector(".backlog-tab .main-items");
const progressTab = document.querySelector(".progress-tab .main-items");
const completedTab = document.querySelector(".completed-tab .main-items");
const holdTab = document.querySelector(".hold-tab .main-items");

const addBtn = document.querySelector(".btn-add");

const dropAreas = document.querySelectorAll(".main-items");

let items = JSON.parse(localStorage.getItem("items")) ?? [[], [], [], []];
let tabs = [backlogTab, progressTab, completedTab, holdTab];

let draggedItem = null;
let droppedArea = null;

let prevItemText = "";

const dragStart = ({ target }) => (draggedItem = target);

const dragEnter = (e) => {
  e.preventDefault();
  const dropTarget = e.target.closest(".main-items");
  dropTarget.style.outline = `4px dashed var(--color-${
    dropTarget.closest(".head-item").dataset.tab
  })`;
};

const dragLeave = (e) => {
  e.preventDefault();
  const dropTarget = e.target.closest(".main-items");
  dropTarget.style.outline = "none";
};

const drop = (e) => {
  const dropTarget = e.target.closest(".main-items");
  dropTarget.style.outline = "none";

  droppedArea = dropTarget;

  dragAndDrop();
};

const dragAndDrop = () => {
  const from = draggedItem.closest(".head-item").dataset.tab;
  const to = droppedArea.closest(".head-item").dataset.tab;
  const itemText = draggedItem.textContent;

  items[from].splice(items[from].indexOf(itemText), 1);
  items[to].push(itemText);

  draggedItem.remove();
  droppedArea.appendChild(draggedItem);

  saveInLocalStorage();
};

const focusOut = ({ target }) => {
  const tab = target.closest(".head-item").dataset.tab;
  const index = items[tab].indexOf(prevItemText);
  items[tab][index] = target.textContent;
  saveInLocalStorage();
};

const createItem = (itemText) => {
  const item = document.createElement("li");
  item.textContent = itemText;
  item.className = "main-item";
  item.draggable = true;
  item.contentEditable = true;
  item.addEventListener("dragstart", dragStart);
  item.addEventListener(
    "focusin",
    (e) => (prevItemText = e.target.textContent)
  );
  item.addEventListener("focusout", focusOut);
  return item;
};

const renderItems = () => {
  tabs.forEach((tab, index) =>
    items[index].forEach((itemText) => {
      const item = createItem(itemText);
      tab.appendChild(item);
    })
  );
};

const addItem = (target) => {
  const tab = target.closest(".head-item").dataset.tab;
  allSaveBtns[tab].hidden = true;
  allAddBtns[tab].hidden = false;
  allTextAreas[tab].hidden = true;

  const itemText = allTextAreas[tab].textContent;
  if (itemText) {
    items[tab].push(itemText);
    allTextAreas[tab].textContent = "";
    const item = createItem(itemText);
    tabs[tab].append(item);
    saveInLocalStorage();
  }
};

renderItems();

const saveInLocalStorage = () =>
  localStorage.setItem("items", JSON.stringify(items));

TabsContainer.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btn-add")) {
    const tab = target.closest(".head-item").dataset.tab;
    target.hidden = true;
    allSaveBtns[tab].hidden = false;
    allTextAreas[tab].hidden = false;

    allTextAreas[tab].focus();
  }

  if (target.classList.contains("btn-save")) addItem(target);
});

allTextAreas.forEach((textArea) =>
  textArea.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && addItem(e.target)
  )
);

dropAreas.forEach((dropArea) => {
  dropArea.addEventListener("dragover", dragEnter);
  dropArea.addEventListener("dragleave", dragLeave);
  dropArea.addEventListener("drop", drop);
});
