import React from 'react';

export const Navbar: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Import locally to ensure vite handles the path
    const logo = new URL('../../assets/logo.png', import.meta.url).href;

    return (
        <nav className="fixed top-0 left-0 p-6 z-50 flex flex-col items-start gap-4 pointer-events-none">
            {/* Logo - Professional, Static, Smaller */}
            <button
                onClick={scrollToTop}
                className="pointer-events-auto w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-white cursor-pointer hover:opacity-90 transition-opacity"
            >
                <img
                    src={logo}
                    alt="Kaiwa Club Logo"
                    className="w-full h-full object-cover"
                />
            </button>
        </nav>
    );
};
