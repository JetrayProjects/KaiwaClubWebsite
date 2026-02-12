import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-kaiwa-bg relative overflow-x-hidden font-sans text-kaiwa-onyx">
            <Navbar />
            <main className="w-full">
                {children}
            </main>
            <footer className="w-full py-8 text-center text-kaiwa-onyx/50 text-sm">
                <p>&copy; {new Date().getFullYear()} Japanese Conversation Club. All rights reserved.</p>
            </footer>
        </div>
    );
};
