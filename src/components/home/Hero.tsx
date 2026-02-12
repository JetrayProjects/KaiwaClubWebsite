import React from 'react';
import { Chatbot } from './Chatbot';

export const Hero: React.FC = () => {
    // Import locally to ensure vite handles the path
    const heroBgDesktop = new URL('../../assets/hero-bg.png', import.meta.url).href;
    const heroBgMobile = new URL('../../assets/KaiwaClubResponsive.png', import.meta.url).href;

    return (
        <section className="relative h-screen w-full overflow-hidden text-center">
            {/* Background Image with Responsive Switching */}
            <div className="absolute inset-0 z-0">
                <picture>
                    <source media="(max-width: 768px)" srcSet={heroBgMobile} />
                    <img
                        src={heroBgDesktop}
                        alt="Japanese Conversation Club"
                        className="w-full h-full object-cover"
                    />
                </picture>

                {/* Gradient Fade to Content */}
                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-kaiwa-bg to-transparent" />
            </div>

            {/* Chatbot Interface - absolutely positioned */}
            <div className="absolute bottom-32 left-0 right-0 z-10 w-full px-4">
                <Chatbot />
            </div>
        </section>
    );
}
