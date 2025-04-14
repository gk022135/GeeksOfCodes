import { useEffect, useState } from "react";

function ThemeSelector() {
  const themes = [
    'dark',
    'forest',
    'synthwave',
    'black',
    'business',
    'dracula',
    'night',
    'halloween',
    'luxury',
    'dim',
    'coffee',
    'cmyk'
  ];
  const [activeTheme, setActiveTheme] = useState('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setActiveTheme(savedTheme);
  }, []);

  const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setActiveTheme(theme);
  };

  return (
    <div className="dropdown mb-4">
      <label tabIndex={0} className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block ml-1 h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </label>
      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-10 w-52 p-2 shadow-2xl">
        {themes.map((theme) => (
          <li key={theme}>
            <button
              className={`w-full btn btn-sm btn-ghost justify-start ${activeTheme === theme ? 'bg-primary text-primary-content' : ''
                }`}
              onClick={() => changeTheme(theme)}
            >
              {theme}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSelector;
