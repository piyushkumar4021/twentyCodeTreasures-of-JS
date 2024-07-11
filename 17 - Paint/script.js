const toolLabel = document.querySelector(".selected-tool");
const sliderLabel = document.querySelector(".brush-size");
const sliderEl = document.querySelector(".brush-slider");
const brushColorPickerEl = document.querySelector(".brush-color-picker");
const backgroundPickerEl = document.querySelector(".background-color-picker");
const toolbarEl = document.querySelector(".toolbar");
const canvasEl = document.querySelector("#canvas");
const eraserEl = document.querySelector(".eraser");
const brushEl = document.querySelector(".brush");
const clearCanvasEL = document.querySelector(".clear");
const saveCanvasBtn = document.querySelector(".save-canvas");
const notSupportedEl = document.querySelector(".not-supported");

let context = null;
let toolSize = 10;
let brushColor = "#000";
let backgroundColor = "#fff";
let isMouseDown = false;
let isEraser = false;

let lines = []; // TYPE: { x, y, size, color }

if (canvasEl.getContext) {
  // Set canvas width and height
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight - toolbarEl.clientHeight;

  context = canvasEl.getContext("2d");

  context.strokeStyle = brushColor;
  context.lineCap = "round";
}

const repaintCanvas = (lines) => {
  lines.forEach((line, i) => {
    context.beginPath();
    context.moveTo(lines[i - 1]?.offsetX, lines[i - 1]?.offsetY);
    context.lineTo(line.offsetX, line.offsetY);
    context.strokeStyle = line.brushColor || backgroundColor;
    context.lineWidth = line.toolSize;
    context.stroke();
  });
};

const clearCanvas = () => {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvasEl.clientWidth, canvasEl.clientHeight);
};

const updateSliderValue = () => {
  const { value } = sliderEl;
  sliderLabel.textContent = value.padStart(2, "0");
  toolSize = value;
};

const updateBackgroundColor = () => {
  backgroundColor = backgroundPickerEl.dataset.currentColor;
  canvasEl.style.background = backgroundColor;

  clearCanvas();
  repaintCanvas(lines);
};

const updateBrushColor = () => {
  brushColor = brushColorPickerEl.dataset.currentColor;
};

const switchToEraser = () => {
  eraserEl.classList.add("active");
  brushEl.classList.remove("active");
  toolLabel.textContent = "Eraser";
  isEraser = true;
};

const switchToBrush = () => {
  eraserEl.classList.remove("active");
  brushEl.classList.add("active");
  toolLabel.textContent = "Brush";
  isEraser = false;
};

const saveInLocal = () => {
  localStorage.setItem("lines", JSON.stringify(lines));
  localStorage.setItem("bg", backgroundColor);
};

const loadFromLocal = () => {
  lines = JSON.parse(localStorage.getItem("lines")) || [];
  backgroundPickerEl.dataset.currentColor = localStorage.getItem("bg");

  updateBackgroundColor();
  clearCanvas();
  repaintCanvas(lines);
};

const downloadCanvas = () => {
  saveCanvasBtn.href = canvasEl.toDataURL("image/jpeg", 1);
};

const clearFromLocal = () => {
  localStorage.removeItem("lines");
};

clearCanvas();

sliderEl.addEventListener("input", updateSliderValue);
backgroundPickerEl.addEventListener("input", updateBackgroundColor);
brushColorPickerEl.addEventListener("change", updateBrushColor);

toolbarEl.addEventListener("click", ({ target }) => {
  if (!target.classList.contains("bi")) return;

  target.classList.contains("brush") && switchToBrush();
  target.classList.contains("eraser") && switchToEraser();

  if (target.classList.contains("clear")) {
    lines.length = 0;
    clearCanvas();
  }

  target.classList.contains("save-local") && saveInLocal();
  target.classList.contains("load-local") && loadFromLocal();
  target.classList.contains("clear-local") && clearFromLocal();

  target.classList.contains("save") && downloadCanvas();
});

canvasEl.addEventListener("mousedown", ({ offsetX, offsetY }) => {
  isMouseDown = true;

  context.beginPath();
  context.moveTo(offsetX, offsetY);
  context.lineWidth = toolSize;
  context.strokeStyle = isEraser ? backgroundColor : brushColor;
});

canvasEl.addEventListener("mousemove", ({ offsetX, offsetY }) => {
  if (isMouseDown) {
    context.lineTo(offsetX, offsetY);
    context.stroke();

    const line = { offsetX, offsetY, toolSize };
    if (!isEraser) line.brushColor = brushColor;
    lines.push(line);
  }
});

canvasEl.addEventListener("mouseup", () => {
  isMouseDown = false;

  lines.push({
    offsetX: undefined,
    offsetY: undefined,
    toolSize: undefined,
    brushColor: undefined,
  });
});
