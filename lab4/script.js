// Лабораторна робота №4. Робота із вводом користувача у JavaScript.
// Гра «Pixel Hunt»: потрібно встигати клікати по квадрату, що з’являється у випадковому місці.

document.addEventListener('DOMContentLoaded', () => {
  // ---------- 1. Доступ до елементів DOM ----------
  const menu = document.getElementById('menu');
  const game = document.getElementById('game');
  const difficultySelect = document.getElementById('difficulty');
  const colorSelect = document.getElementById('color');
  const startButton = document.getElementById('start');
  const scoreEl = document.getElementById('score');
  const timerEl = document.querySelector('#timer');
  const pixel = document.getElementById('pixel');

  // ---------- 2. Налаштування рівнів складності ----------
  // size — розмір квадрата (px), time — скільки секунд є на один клік
  const levels = {
    lazy:   { size: 46, time: 5 },
    normal: { size: 40, time: 3 },
    hard:   { size: 30, time: 2 }
  };

  let score = 0;
  let timeLeft = 0;
  let timeLimit = 0;
  let intervalId = null;

  // ---------- 3. Допоміжні функції ----------
  function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  // Переміщення квадрата у випадкове місце вікна (нижче рядків зі статистикою)
  function movePixel() {
    const size = pixel.offsetWidth;
    const top = game.querySelector('#timer').getBoundingClientRect().bottom + 8;
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;
    pixel.style.left = `${randomInt(maxX)}px`;
    pixel.style.top = `${top + randomInt(Math.max(0, maxY - top))}px`;
  }

  function updateScore() {
    scoreEl.textContent = `score: ${score}`;
  }

  function updateTimer() {
    timerEl.textContent = `time left for click: ${timeLeft}`;
  }

  function endGame() {
    clearInterval(intervalId);
    pixel.removeEventListener('click', onPixelClick);
    updateTimer();
    // alert блокує сторінку, тому спочатку оновлюємо текст
    setTimeout(() => {
      alert(`Game over! Your score is ${score}, congratulations!\nPlease, reload the page to start a new game.`);
    }, 0);
  }

  // ---------- 4. Обробники подій ----------
  // Клік по квадрату: +1 очко, скидання таймера, переміщення квадрата
  function onPixelClick() {
    score += 1;
    timeLeft = timeLimit;
    updateScore();
    updateTimer();
    movePixel();
  }

  // Кнопка Start: гра починається лише якщо обрано і складність, і колір
  startButton.addEventListener('click', () => {
    const level = levels[difficultySelect.value];
    const color = colorSelect.value;
    if (!level || !color) {
      return; // користувач ще не зробив вибір — нічого не робимо
    }

    // Налаштовуємо квадрат за вибором користувача
    pixel.style.width = `${level.size}px`;
    pixel.style.height = `${level.size}px`;
    pixel.style.backgroundColor = color;

    timeLimit = level.time;
    timeLeft = timeLimit;
    score = 0;

    // Перемикаємо екрани
    menu.hidden = true;
    game.hidden = false;
    updateScore();
    updateTimer();
    movePixel();

    pixel.addEventListener('click', onPixelClick);

    // Таймер: щосекунди зменшуємо залишок часу
    intervalId = setInterval(() => {
      timeLeft -= 1;
      updateTimer();
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  });
});
