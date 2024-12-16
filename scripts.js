const diceImages = ["baucua/bau.png", "baucua/cua.png", "baucua/tom.png", "baucua/ca.png", "baucua/huou.png", "baucua/ga.png"];
const rollButton = document.getElementById("rollButton");
const resetButton = document.getElementById("resetButton");
const betContainer = document.getElementById("betContainer");

let isRolling = false;
let bets = {};
let totalBets = 0;

// Khởi tạo giao diện đặt cược
function initializeBets() {
    diceImages.forEach((image, index) => {
        const betItem = document.createElement("div");
        betItem.classList.add("bet-item");
        betItem.innerHTML = `
            <img src="${image}" alt="${image}" data-index="${index}">
            <span id="bet-${index}">0</span>
        `;
        betContainer.appendChild(betItem);

        // Thêm sự kiện đặt cược
        betItem.querySelector("img").addEventListener("click", () => placeBet(index));
    });

    resetBets();
}

// Xử lý đặt cược
function placeBet(index) {
    if (isRolling || totalBets >= 3) return;

    bets[index] = (bets[index] || 0) + 1;
    totalBets++;
    updateBetDisplay();
}

// Cập nhật giao diện điểm cược
function updateBetDisplay() {
    for (let i = 0; i < diceImages.length; i++) {
        const betSpan = document.getElementById(`bet-${i}`);
        betSpan.textContent = bets[i] || 0;
    }
}

// Reset tất cả điểm cược
function resetBets() {
    bets = {};
    totalBets = 0;
    for (let i = 0; i < diceImages.length; i++) {
        bets[i] = 0;
    }
    updateBetDisplay();
}

// Quay xí ngầu
function rollDice() {
    if (isRolling) return;

    isRolling = true;
    rollButton.disabled = true;
    resetButton.disabled = true;

    const dice1 = document.getElementById("dice1");
    const dice2 = document.getElementById("dice2");
    const dice3 = document.getElementById("dice3");

    let count = 0;
    const interval = setInterval(() => {
        dice1.src = diceImages[Math.floor(Math.random() * diceImages.length)];
        dice2.src = diceImages[Math.floor(Math.random() * diceImages.length)];
        dice3.src = diceImages[Math.floor(Math.random() * diceImages.length)];
        count++;

        if (count >= 100) {
            clearInterval(interval);
            isRolling = false;

            rollButton.disabled = false;
            resetButton.disabled = false;
        }
    }, 50);
}

// Khởi tạo các sự kiện nút bấm
function setupControls() {
    rollButton.addEventListener("click", rollDice);
    resetButton.addEventListener("click", resetBets);
}

// Khởi tạo trò chơi
function initGame() {
    initializeBets();
    setupControls();
}

initGame();

