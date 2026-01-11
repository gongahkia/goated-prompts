const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Function to set the theme
function setTheme(theme) {
    body.className = theme;
    localStorage.setItem('theme', theme);
}

// Toggle theme
themeSwitcher.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
    setTheme(newTheme);
});

// Set initial theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    // Default to light mode if no theme is saved
    setTheme('light-mode');
}
