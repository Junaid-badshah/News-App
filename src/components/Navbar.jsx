import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-black border-b border-slate-200 dark:border-neutral-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">NewsHub</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
            >
              {theme === 'dark' ? (
                /* Sun icon — dark mode mein (click to go light) */
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                /* Moon icon — light mode mein (click to go dark) */
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <span className="hidden sm:block text-sm text-slate-600 dark:text-slate-400">
              {user?.email}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
