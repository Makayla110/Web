document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.form-control');
  const board = document.getElementById('board');
  const colors = ['#685cab', '#f2b3d6', '#89cce8', '#b3d66b', '#6397eb', '#a875c9'];

  board.style.position = 'relative';

  function getBoardSize() {
    return {
      width: board.clientWidth,
      height: board.clientHeight
    };
  }

  function randomPositionAndRotation() {
    const { width, height } = getBoardSize();
    const maxWidth = 150;
    const maxHeight = 50;
    const left = Math.random() * (width - maxWidth);
    const top = Math.random() * (height - maxHeight);
    return { left, top};
  }

  function loadBoard() {
    const savedData = localStorage.getItem('boardData');
    if (savedData) {
      const items = JSON.parse(savedData);
      items.forEach(item => {
        const span = document.createElement('span');
        span.textContent = item.text;
        span.style.color = item.color;
        span.style.fontSize = item.fontSize;
        span.style.position = 'absolute';
        span.style.left = item.left;
        span.style.top = item.top;
        span.style.display = 'inline-block';
        span.style.margin = '5px';
        board.appendChild(span);
      });
    }
  }

  function saveBoard() {
    const items = [];
    board.querySelectorAll('span').forEach(span => {
      items.push({
        text: span.textContent,
        color: span.style.color,
        fontSize: span.style.fontSize,
        left: span.style.left,
        top: span.style.top,
      });
    });
    localStorage.setItem('boardData', JSON.stringify(items));
  }

  // 將新增文字的邏輯抽成函式，方便重複使用
  function addText() {
    const text = input.value.trim();
    if (!text) return;

    const existing = Array.from(board.children).find(child => child.textContent === text);

    if (existing) {
      const currentSize = window.getComputedStyle(existing).fontSize;
      const newSize = parseFloat(currentSize) * 2;
      existing.style.fontSize = newSize + 'px';
    } else {
      const span = document.createElement('span');
      span.textContent = text;
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
      span.style.fontSize = '16px';
      span.style.position = 'absolute';
      const pos = randomPositionAndRotation();
      span.style.left = pos.left + 'px';
      span.style.top = pos.top + 'px';
      span.style.display = 'inline-block';
      span.style.margin = '5px';
      board.appendChild(span);
    }

    input.value = '';
    saveBoard();
  }

  // 按鈕點擊事件
  document.querySelector('.confirm').addEventListener('click', addText);

  // 監聽輸入框的 keydown 事件，按下 Enter 時觸發 addText
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 防止表單提交或換行
      addText();
    }
  });

  loadBoard();
});

//localStorage.clear();
