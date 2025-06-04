document.addEventListener('DOMContentLoaded', () => {
    const bkaudio = document.getElementById("backmusic");
    const bkplayIcon = document.querySelector(".music-btn svg");
    const iconPath = document.getElementById("music-icon-path");

    // 播放與暫停圖示路徑
    const playPath = "M5 3l14 9-14 9V3z"; // 播放三角形
    const pausePath = "M6 4h4v16H6zM14 4h4v16h-4z"; // 暫停兩條線

    // 頁面載入自動播放
    bkaudio.play().catch(e => {
      // 自動播放失敗（瀏覽器限制），可提示用戶點擊播放
      console.log("自動播放失敗，請點擊播放按鈕");
    });

    // 播放時更新圖示
    bkaudio.addEventListener('play', () => {
      iconPath.setAttribute('d', pausePath);
      bkplayIcon.setAttribute('fill', '#7d54cb');
      bkplayIcon.setAttribute('stroke', '#7d54cb');
    });

    // 暫停時更新圖示
    bkaudio.addEventListener('pause', () => {
      iconPath.setAttribute('d', playPath);
      bkplayIcon.setAttribute('fill', '#333333');
      bkplayIcon.setAttribute('stroke', '#333333');
    });

    // 點擊按鈕切換播放/暫停
    document.querySelector(".music-btn").addEventListener('click', () => {
      if (bkaudio.paused) {
        bkaudio.play();
      } else {
        bkaudio.pause();
      }
    });
  });