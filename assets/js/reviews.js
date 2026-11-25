const reviewActivities = [
  "finding a quick game",
  "switching game libraries in Settings",
  "browsing the apps collection",
  "using the built-in browser",
  "exploring the purple galaxy theme",
  "opening games in the built-in player",
];

const reviewImpressions = [
  "simple to browse",
  "easy to navigate",
  "bright and playful",
  "full of things to explore",
];

const reviewElement = document.getElementById("homeReview");

if (reviewElement) {
  const activity = reviewActivities[Math.floor(Math.random() * reviewActivities.length)];
  const impression = reviewImpressions[Math.floor(Math.random() * reviewImpressions.length)];
  reviewElement.textContent = `“A fictional visitor might enjoy ${activity}. The site feels ${impression}.”`;
}
