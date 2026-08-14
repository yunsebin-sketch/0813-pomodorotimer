const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const timeDisplay = document.getElementById("timeDisplay");

function getConfiguredMinutes() {
  const savedMinutes = Number(localStorage.getItem(STORAGE_KEY));
  const isValid =
    Number.isInteger(savedMinutes) && savedMinutes >= MIN_MINUTES && savedMinutes <= MAX_MINUTES;
  return isValid ? savedMinutes : DEFAULT_MINUTES;
}

let remainingSeconds = getConfiguredMinutes() * 60;
let timerId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (timerId !== null) {
    return;
  }

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }

    remainingSeconds -= 1;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getConfiguredMinutes() * 60;
  updateDisplay();
}

updateDisplay();
