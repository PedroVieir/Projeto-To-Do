import { useEffect, useState } from 'react';

export default function ThemeToggleFAB() {
  const [theme, setTheme] = useState('system');

  // inicializa tema
  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'system';
    setTheme(stored);

    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (stored === 'dark' || (stored === 'system' && prefersDark)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <button aria-label="Alternar tema" className="fab" onClick={toggle} title="Alternar tema">
      {/* ícone simples inline (sol/lua) */}
      <span className="text-xl md:text-2xl">
        {theme === 'dark' ? '🌞' : '🌙'}
      </span>
    </button>
  );
}
