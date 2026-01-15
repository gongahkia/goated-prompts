const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Function to set the theme
function setTheme(theme) {
    body.className = theme;
    localStorage.setItem('theme', theme);
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
        if (theme === 'dark-mode') {
            logoImg.src = 'asset/logo-dark.png';
        } else {
            logoImg.src = 'asset/logo-light.png';
        }
    }
}

// Toggle theme
themeSwitcher.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
    setTheme(newTheme);
});

// Set initial theme and logo
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('light-mode');
}
