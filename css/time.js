window.onload = function() {
  function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const nowStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    document.getElementById("datetime").textContent = nowStr;
  }
  updateTime(); // 先執行一次
  setInterval(updateTime, 1000); // 每秒更新一次
};
