const announcements = [
  "Welcome to HWH.UBG.",
  "Pick a game and make it your next favorite.",
  "Switch collections in Settings under Game Library.",
  "Explore games, apps, and the built-in browser.",
  "Your next quick game break starts here.",
  "Find something fun to play today.",
  "Browse the collection and jump right in.",
  "The galaxy is yours to explore.",
  "Open a game and let the fun begin.",
  "More games are just a library switch away.",
  "Welcome back to HWH.UBG.",
];

for (let index = announcements.length - 1; index > 1; index -= 1) {
  const randomIndex = 1 + Math.floor(Math.random() * index);
  [announcements[index], announcements[randomIndex]] = [
    announcements[randomIndex],
    announcements[index],
  ];
}

const announcementEl = document.getElementById("splash");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (announcementEl) {
  let typingTimer = null;

  function renderAnnouncement(announcement, length) {
    const visibleText = announcement.slice(0, length);
    const brand = "HWH.UBG";
    const brandIndex = announcement.indexOf(brand);

    if (brandIndex < 0 || length <= brandIndex) {
      announcementEl.textContent = visibleText;
      return;
    }

    const visibleBrand = brand.slice(0, Math.min(brand.length, length - brandIndex));
    const wordmark = document.createElement("span");
    wordmark.className = "hwh-wordmark";
    let remaining = visibleBrand;

    for (const part of ["H", "W", "H", ".UBG"]) {
      const character = document.createElement("span");
      character.textContent = remaining.slice(0, part.length);
      remaining = remaining.slice(part.length);
      wordmark.appendChild(character);
    }

    announcementEl.replaceChildren(
      document.createTextNode(visibleText.slice(0, brandIndex)),
      wordmark,
      document.createTextNode(visibleText.slice(brandIndex + visibleBrand.length)),
    );
  }

  if (reducedMotion.matches) {
    renderAnnouncement(announcements[0], announcements[0].length);
  } else {
    let announcementIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function scheduleTyping(delay) {
      if (document.hidden) return;
      window.clearTimeout(typingTimer);
      typingTimer = window.setTimeout(() => {
        typingTimer = null;
        typeAnnouncement();
      }, delay);
    }

    function typeAnnouncement() {
      if (document.hidden) return;
      const announcement = announcements[announcementIndex];
      renderAnnouncement(announcement, characterIndex);

      if (!deleting && characterIndex < announcement.length) {
        characterIndex += 1;
        scheduleTyping(55);
      } else if (!deleting) {
        deleting = true;
        scheduleTyping(1500);
      } else if (characterIndex > 0) {
        characterIndex -= 1;
        scheduleTyping(28);
      } else {
        deleting = false;
        announcementIndex = (announcementIndex + 1) % announcements.length;
        scheduleTyping(350);
      }
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.clearTimeout(typingTimer);
        typingTimer = null;
      } else {
        scheduleTyping(0);
      }
    });

    typeAnnouncement();
  }
}
