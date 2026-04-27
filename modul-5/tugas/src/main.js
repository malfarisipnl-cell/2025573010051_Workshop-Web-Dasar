import './style.css';
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Cek preferensi sebelumnya
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
  themeIcon.innerText = '☀️';
} else {
  html.classList.remove('dark');
  themeIcon.innerText = '🌙';
}

themeToggle.addEventListener('click', () => {
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeIcon.innerText = '🌙';
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.innerText = '☀️';
  }
});