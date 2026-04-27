import "./style.css";

const btn = document.getElementById('toggleDark')
const html = document.documentElement

// Initialize dark mode from localStorage atau system preference
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark')
  btn.textContent = 'Light'
} else if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.classList.add('dark')
  btn.textContent = ' Light'
}

// Toggle dark mode dengan varian Tailwind
btn.addEventListener('click', () => {
  html.classList.toggle('dark')
  const isDark = html.classList.contains('dark')
  btn.textContent = isDark ? ' Light' : ' Dark'
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
})
