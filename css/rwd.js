//滑鼠特效
const colors = [
  'rgba(197, 163, 238, 0.7)', 'rgba(140, 169, 255, 0.7)', 'rgba(120,220,255,0.7)',
  'rgba(246, 201, 221, 0.7)', 'rgba(249, 240, 255, 0.7)', 'rgba(235, 218, 255, 0.7)',
  'rgba(240, 145, 197, 0.6)', 'rgba(255,255,255,0.8)'
];
const galaxy = document.getElementById('galaxy-cursor');
let isMouseDown = false;
let lastX = 0, lastY = 0;
document.addEventListener('mousedown', e => {
  isMouseDown = true;
  lastX = e.clientX;
  lastY = e.clientY;
  spawnDots(e.clientX, e.clientY, false);
});
document.addEventListener('mouseup', e => { isMouseDown = false; });
document.addEventListener('mousemove', e => {
  if (lastX === null || lastY === null) {
    lastX = e.clientX;
    lastY = e.clientY;
    return; // 第一次不畫拖尾
  }
    createTail(lastX, lastY, e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
    if (Math.random() < 0.25) spawnDots(e.clientX, e.clientY, true);
});
document.addEventListener('click', e => { spawnDots(e.clientX, e.clientY); });
function spawnDots(x, y, isDragging) {
  const num = isDragging ? 1 + Math.floor(Math.random() * 1) : 1 + Math.floor(Math.random() * 2);
  for(let i = 0; i < num; i++) {
    // 以下程式碼不變
    const dot = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 2;
    const angle = Math.random() * Math.PI * 2;
    const radius = isDragging ? 4 + Math.random() * 8 : 6 + Math.random() * 15;
    dot.className = 'galaxy-dot';
    dot.style.background = color;
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = (x + Math.cos(angle) * radius - size / 2) + 'px';
    dot.style.top = (y + Math.sin(angle) * radius - size / 2) + 'px';
    dot.style.boxShadow = `0 0 ${Math.floor(4 + Math.random() * 6)}px ${color}`;
    galaxy.appendChild(dot);
    setTimeout(() => dot.remove(), 200);
  }
}

function createTail(x1, y1, x2, y2) {
  const tail = document.createElement('div');
  tail.className = 'galaxy-tail';
  const dx = x2-x1, dy = y2-y1;
  const length = Math.sqrt(dx*dx + dy*dy);
  tail.style.width = length + 6 + 'px';
  tail.style.height = '8px';
  tail.style.left = Math.min(x1, x2) + 'px';
  tail.style.top = Math.min(y1, y2) - 6 + 'px';
  tail.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
  galaxy.appendChild(tail);
  setTimeout(()=>tail.remove(), 400);
}
//滑鼠特效

//音樂播放
  const audio = document.getElementById("audio-player");
  const playIcon = document.querySelector(".play-icon");
  const progressBar = document.querySelector(".progress");
  let isPlaying = false;

  // 歌曲列表對應關係
  const songMap = {
    "item-1": "music/MinorPiece.mp3",
    "item-2": "music/Soloist.mp3",
    "item-3": "music/BladeofWords.mp3"
  };

  // 播放/暫停控制
  function togglePlay() {
    const selectedSong = document.querySelector('input[name="slider"]:checked').id;
    if (!audio.src.includes(songMap[selectedSong])) {
      audio.src = songMap[selectedSong];
    }
    
    if (isPlaying) {
      audio.pause();
      playIcon.innerHTML = `
        <svg width="20" height="20" fill="#7d54cb" stroke="#7d54cb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
          <path d="M5 3l14 9-14 9V3z"/>
        </svg>`;
    } else {
      audio.play();
      playIcon.innerHTML = `
        <svg width="20" height="20" fill="#7d54cb" stroke="#7d54cb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
        </svg>`;
    }
    isPlaying = !isPlaying;
  }

  // 進度條更新
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  // 點擊播放圖示
  playIcon.addEventListener("click", togglePlay);

  // 切換歌曲時自動播放
  document.querySelectorAll('input[name="slider"]').forEach(radio => {
    radio.addEventListener("change", () => {
      if (isPlaying) {
        audio.src = songMap[radio.id];
        audio.play();
      }
    });
  });

  // 歌曲結束處理
  audio.addEventListener("ended", () => {
    isPlaying = false;
    playIcon.innerHTML = `
      <svg width="20" height="20" fill="#7d54cb" stroke="#7d54cb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
        <path d="M5 3l14 9-14 9V3z"/>
      </svg>`;
    progressBar.style.width = "0%";
  });

  $('input').on('change', function() {
    $('body').toggleClass('blue');
  });
  //音樂播放
 
  
