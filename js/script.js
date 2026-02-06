const noBtn = document.querySelector('#noBtn');
const yesBtn = document.querySelector('#yesBtn');
const backBtn = document.querySelector('#backBtn');

let yesScale = 1; 
let noClickCount = 0;

const phrases = [
    "Точно?", "А если подумать?", "Ну пожалуйста...", 
    "Я обижусь!", "Даже за делиску?", "Я щас плакать пойду :("
];

// Логика убегания кнопки "Нет"
const moveButton = () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    yesScale += 0.5; 
    yesBtn.style.transform = `scale(${yesScale})`;

    if (noClickCount < phrases.length) {
        noBtn.innerText = phrases[noClickCount];
        noClickCount++;
    }
};

// Наведение и клик (для мобилок)
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

// ЛОГИКА ПОБЕДЫ
yesBtn.addEventListener('click', () => {
    // ВАЖНО: Показываем кнопку "Назад"
    if (backBtn) {
        backBtn.style.display = 'flex';
    }

    // Запуск конфетти
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 }
        });
    }

    // Меняем контент карточки
    setTimeout(() => {
        document.querySelector('.card').innerHTML = `
            <img src="assets/celebrate.gif" class="cat-img">
            <h1 style="font-family: 'Comic Sans MS';">Урааа!❤️</h1>
            <p style="font-family: 'Comic Sans MS';">Я знал, что ты выберешь Да!</p>
        `;
    }, 200);
});

// ЛОГИКА СБРОСА
if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.location.reload(); 
    });

}
