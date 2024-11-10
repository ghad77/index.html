let currentPlayer = 'X'; // X هو اللاعب البشري
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerVsRobot = true; // اللعب ضد الروبوت

const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const status = document.getElementById('status');

// إنشاء لوحة اللعبة
function createBoard() {
  board.innerHTML = ''; // تأكد من أن اللوحة نظيفة قبل إعادة إنشائها
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X'; // يبدأ اللاعب البشري
  gameActive = true;
  status.textContent = `دورك ${currentPlayer}`;
  status.classList.remove('winner', 'tie'); // إزالة أي تأثير فوز أو تعادل
  document.body.classList.remove('winner-human', 'winner-robot'); // إزالة فئات الفوز من الجسم

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(event) {
  if (!gameActive) return;
  
  const cellIndex = event.target.getAttribute('data-index');
  
  if (gameBoard[cellIndex] !== '' || currentPlayer !== 'X') return; // إذا كانت الخانة ممتلئة أو ليس دور اللاعب البشري
  
  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('disabled');
  
  if (checkWinner(currentPlayer)) {
    gameActive = false;
    if (currentPlayer === 'X') {
      status.textContent = `تهانينا! اللاعب ${currentPlayer} فاز!`;
      status.classList.add('winner');
      document.body.classList.add('winner-human');
    } else {
      status.textContent = "الروبوت فاز!";
      status.classList.add('winner');
      document.body.classList.add('winner-robot');
    }
    return;
  } else if (gameBoard.every(cell => cell !== '')) {
    gameActive = false;
    status.textContent = "تعادل!";
    status.classList.add('tie');
    return;
  }

  currentPlayer = 'O'; // تغيير الدور للروبوت
  status.textContent = "دور الروبوت...";
  setTimeout(robotMove, 500); // تأخير حركة الروبوت
}

function robotMove() {
  let emptyCells = gameBoard.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);
  
  if (emptyCells.length === 0 || !gameActive) return; // إذا انتهت اللعبة أو لا توجد خلايا فارغة

  // اختيار حركة عشوائية للروبوت
  const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameBoard[randomMove] = 'O';
  const cell = document.querySelector(`[data-index='${randomMove}']`);
  cell.textContent = 'O';
  cell.classList.add('disabled');

  if (checkWinner('O')) {
    gameActive = false;
    status.textContent = "الروبوت فاز!";
    status.classList.add('winner');
    document.body.classList.add('winner-robot');
    return;
  } else if (gameBoard.every(cell => cell !== '')) {
    gameActive = false;
    status.textContent = "تعادل!";
    status.classList.add('tie');
    return;
  }

  currentPlayer = 'X'; // تغيير الدور للاعب البشري
  status.textContent = `دورك ${currentPlayer}`;
}

function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // الصفوف
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // الأعمدة
    [0, 4, 8], [2, 4, 6]             // الأقطار
  ];
  
  return winPatterns.some(pattern => {
    return pattern.every(index => gameBoard[index] === player);
  });
  document.getElementById('startBtn').addEventListener('click', function() {
  window.location.href = 'game.html'; // تأكد من أن هذا هو الرابط الصحيح للصفحة الخاصة باللعبة
});
document.getElementById('startBtn').addEventListener('click', function() {
  window.location.href = 'game.html'; // تأكد من أن هذا هو الرابط الصحيح للصفحة الخاصة باللعبة
});


}

resetBtn.addEventListener('click', createBoard);

createBoard();
