const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById("timerMinutes");
const confirmBtn = document.querySelector(".btn-confirm");

function isValidMinutes(value) {
  if (value === "") {
    return false;
  }

  const minutes = Number(value);
  return Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES;
}

function updateConfirmState() {
  confirmBtn.disabled = !isValidMinutes(minutesInput.value);
}

function saveSetting() {
  if (!isValidMinutes(minutesInput.value)) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, String(Number(minutesInput.value)));
  window.location.href = "index.html";
}

const savedMinutes = localStorage.getItem(STORAGE_KEY);
if (savedMinutes !== null) {
  minutesInput.value = savedMinutes;
}

updateConfirmState();
