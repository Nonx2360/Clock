let countdown;
let timeLeft = 0;
let isPaused = false;

const timeDisplay = document.getElementById('time');
const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (isPaused) {
        isPaused = false;
    } else {
        const hours = parseInt(inputHours.value) || 0;
        const minutes = parseInt(inputMinutes.value) || 0;
        const seconds = parseInt(inputSeconds.value) || 0;

        timeLeft = (hours * 3600) + (minutes * 60) + seconds;

        if (timeLeft <= 0) {
            alert("Please enter a valid time.");
            return;
        }
    }

    clearInterval(countdown);
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(countdown);
            alert("Time's up!");
        }
    }, 1000);
});

pauseBtn.addEventListener('click', () => {
    isPaused = true;
    clearInterval(countdown);
});

resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    timeLeft = 0;
    isPaused = false;
    updateDisplay();
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';
});