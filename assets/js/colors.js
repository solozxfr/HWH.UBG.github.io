const link = document.getElementById('css-theme-link');
const theme = localStorage.getItem('cherri_theme') ?? 'default';
const colorsRoot = new URL("../../", document.currentScript.src);

if (theme !== 'default') {
    link.href = new URL(`assets/css/themes/${theme}.css`, colorsRoot).href;
} else {
    link.href = new URL("assets/css/colors.css", colorsRoot).href;
}