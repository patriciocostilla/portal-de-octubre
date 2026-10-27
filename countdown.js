(function (root) {
  'use strict';
  function getCountdown(now = new Date()) {
    const year = now.getFullYear();
    const todayIsPortal = now.getMonth() === 9 && now.getDate() === 29;
    let target = new Date(year, 9, 29);
    if (now > target && !todayIsPortal) target = new Date(year + 1, 9, 29);
    const previous = new Date(target.getFullYear() - 1, 9, 29);
    const remaining = todayIsPortal ? 0 : Math.max(0, target - now);
    const totalSeconds = Math.floor(remaining / 1000);
    return {
      year: target.getFullYear(),
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds / 3600) % 24,
      minutes: Math.floor(totalSeconds / 60) % 60,
      seconds: totalSeconds % 60,
      progress: todayIsPortal ? 100 : Math.min(100, Math.max(0, (now - previous) / (target - previous) * 100)),
      arrived: todayIsPortal,
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { getCountdown };
  else root.getCountdown = getCountdown;
})(typeof window !== 'undefined' ? window : globalThis);
