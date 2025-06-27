import { useEffect, useState } from "react";
import { SunMoon } from 'lucide-react';

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
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1 rounded-4xl bg-base-100">
       <SunMoon color="yellow" size={35}/>
        
      </label>
      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-10 w-52 p-2 shadow-2xl text-white">
        {themes.map((theme) => (
          <li key={theme}>
            <button
              className={`w-full btn btn-sm btn-ghost justify-start ${activeTheme === theme ? 'bg-primary' : ''
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
