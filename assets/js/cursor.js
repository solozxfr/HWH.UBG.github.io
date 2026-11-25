const useCursor = localStorage.getItem("cherri_customCursor") ?? "yes";

let animationId = null;
let mouseMoveHandler = null;
let messageHandler = null;
let hideTimeout = null;
let visibilityHandler = null;

function cursor() {
  const cursor = document.createElement("div");
  cursor.style.position = "fixed";
  cursor.style.top = "0";
  cursor.style.left = "0";
  cursor.style.width = "16px";
  cursor.style.height = "16px";
  cursor.style.borderRadius = "50%";
  cursor.style.background = "white";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "9999";
  cursor.style.transform = "translate(-50%, -50%)";
  cursor.style.transition =
    "width 0.15s ease, height 0.15s ease, opacity 0.15s ease, 0.0412s transform";
  cursor.style.mixBlendMode = "difference";
  cursor.id = "cursor-thank-you-zxs";
  document.body.appendChild(cursor);

  let cursorVisible = true;
  let mouseX = 0;
  let mouseY = 0;
  let displayX = 0;
  let displayY = 0;

  function animate() {
    const deltaX = mouseX - displayX;
    const deltaY = mouseY - displayY;
    if (Math.abs(deltaX) < 0.1 && Math.abs(deltaY) < 0.1) {
      displayX = mouseX;
      displayY = mouseY;
      cursor.style.transform = `translate(${displayX - 8}px, ${displayY - 8}px)`;
      animationId = null;
      return;
    }

    displayX += deltaX * 0.25;
    displayY += deltaY * 0.25;
    cursor.style.transform = `translate(${displayX - 8}px, ${displayY - 8}px)`;
    animationId = requestAnimationFrame(animate);
  }

  function updateCursor(x, y) {
    if (document.hidden) return;
    mouseX = x;
    mouseY = y;
    if (!cursorVisible) showCursor();
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hideCursor, 500);
    if (animationId === null) animationId = requestAnimationFrame(animate);
  }

  mouseMoveHandler = (e) => updateCursor(e.clientX, e.clientY);
  window.addEventListener("mousemove", mouseMoveHandler);

  messageHandler = (e) => {
    const data = e.data;
    if (!data || typeof data !== "object") return;

    const iframe = Array.from(document.querySelectorAll("iframe")).find(
      (f) => f.contentWindow === e.source
    );
    let offsetX = 0,
      offsetY = 0;
    if (iframe) {
      const rect = iframe.getBoundingClientRect();
      offsetX = rect.left;
      offsetY = rect.top;
    }

    if (data.type === "cursorMove")
      updateCursor(data.x + offsetX, data.y + offsetY);
  };
  window.addEventListener("message", messageHandler);

  const hideCursorStyle = document.createElement("style");
  hideCursorStyle.textContent = `* { cursor: none !important; }`;
  hideCursorStyle.id = "cursor-style-zxs";
  document.head.appendChild(hideCursorStyle);

  hideTimeout = setTimeout(hideCursor, 500);

  visibilityHandler = () => {
    if (!document.hidden) return;
    clearTimeout(hideTimeout);
    hideTimeout = null;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    hideCursor();
  };
  document.addEventListener("visibilitychange", visibilityHandler);

  function hideCursor() {
    cursor.style.opacity = "0";
    cursorVisible = false;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function showCursor() {
    cursor.style.opacity = "1";
    cursorVisible = true;
  }
}

function removeCursor() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (mouseMoveHandler) {
    window.removeEventListener("mousemove", mouseMoveHandler);
    mouseMoveHandler = null;
  }
  if (messageHandler) {
    window.removeEventListener("message", messageHandler);
    messageHandler = null;
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  if (visibilityHandler) {
    document.removeEventListener("visibilitychange", visibilityHandler);
    visibilityHandler = null;
  }
  const cursorEl = document.getElementById("cursor-thank-you-zxs");
  const cursorStyle = document.getElementById("cursor-style-zxs");
  if (cursorEl) cursorEl.remove();
  if (cursorStyle) cursorStyle.remove();
}

if (useCursor === "yes") {
  cursor();
}