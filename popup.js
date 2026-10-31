let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let currentMode = 'work'; // 'work', 'shortBreak', 'longBreak'


const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');

const modeWork = document.getElementById('mode-work');
const modeShortBreak = document.getElementById('mode-short-break');
const modeLongBreak = document.getElementById('mode-long-break');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setMode(mode, duration, buttonElement) {
    clearInterval(timerId);
    timerId = null;
    currentMode = mode;
    timeLeft = duration

    document.querySelectorAll('.modes button').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    updateDisplay();
}
    


    


function startTimer() {
  if (timerId !== null) return; // Prevent multiple intervals
  
  timerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      timerId = null;
      alert(currentMode === 'work' ? 'Pomodoro session completed! Take a break.' : 'Break is over! Back to work.');
      resetTimer();
    }
  }, 1000);
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    if (currentMode === 'work') {timeLeft = 25 * 60;}
    if (currentMode === 'shortBreak') {timeLeft = 5 * 60;}
    if (currentMode === 'longBreak') {timeLeft = 15 * 60;}
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

modeWork.addEventListener('click', () => setMode('work', 25 * 60, modeWork));
modeShortBreak.addEventListener('click', () => setMode('shortBreak', 5 * 60, modeShortBreak));
modeLongBreak.addEventListener('click', () => setMode('longBreak', 15 * 60, modeLongBreak));

updateDisplay();