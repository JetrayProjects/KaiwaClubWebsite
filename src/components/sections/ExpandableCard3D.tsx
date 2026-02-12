import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ExpandableCard3DProps {
    id: string;
    title: string;
    summary: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
    backgroundImage: string;
}

export const ExpandableCard3D: React.FC<ExpandableCard3DProps> = ({
    id,
    title,
    summary,
    icon,
    content,
    backgroundImage,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isExpanded]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile || isExpanded) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
        if (!isMobile && !isExpanded) setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
    };

    const handleClick = () => {
        setIsExpanded(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    // Calculate 3D transforms
    const rotateX = isMobile ? 0 : (mousePosition.y / 8) * -1;
    const rotateY = isMobile ? 0 : mousePosition.x / 8;
    const translateX = isMobile ? 0 : mousePosition.x / -15;
    const translateY = isMobile ? 0 : mousePosition.y / -15;

    return (
        <>
            {/* Card Preview */}
            <motion.div
                className="relative w-full md:w-64 flex-shrink-0"
                style={{ perspective: '1200px' }}
            >
                <motion.div
                    ref={cardRef}
                    onClick={handleClick}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative cursor-pointer overflow-hidden rounded-2xl h-96 w-full"
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                    animate={{
                        rotateX: rotateX,
                        rotateY: rotateY,
                    }}
                    whileHover={{
                        scale: 1.02,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    {/* Animated Gradient Border Effect (appears on hover) */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: 'linear-gradient(45deg, transparent 5%, #10b981 20%, #34d399 40%, #fbbf24 50%, #34d399 60%, #10b981 80%, transparent 95%)',
                            filter: 'blur(1px)',
                            zIndex: 0,
                        }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Card Content Wrapper (sits on top of gradient border) */}
                    <div className="absolute inset-[2px] rounded-2xl overflow-hidden" style={{ zIndex: 1 }}>
                        {/* Background Image with Parallax */}
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${backgroundImage})`,
                                scale: 1.1,
                            }}
                            animate={{
                                x: translateX,
                                y: translateY,
                                scale: isHovered ? 1.15 : 1.1,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30,
                            }}
                        />

                        {/* Gradient Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                            animate={{
                                opacity: isHovered ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Shadow Effect */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            animate={{
                                boxShadow: isHovered
                                    ? '0 30px 60px rgba(0,0,0,0.66), inset 0 0 0 3px rgba(16, 185, 129, 0.6), inset 0 0 0 4px rgba(251, 191, 36, 0.4), 0 0 20px rgba(16, 185, 129, 0.5)'
                                    : '0 10px 30px rgba(0,0,0,0.3)',
                            }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Content */}
                        <motion.div
                            className="relative z-10 h-full flex flex-col justify-end p-6"
                            animate={{
                                y: isHovered ? -10 : 0,
                            }}
                            transition={{ duration: 0.6 }}
                        >
                            {icon && (
                                <div className="text-kaiwa-emerald mb-3 drop-shadow-lg">
                                    {icon}
                                </div>
                            )}
                            <h3 className="text-4xl font-bold text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                                {title}
                            </h3>
                            <motion.p
                                className="text-white text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                                animate={{
                                    opacity: isHovered ? 1 : 0.9,
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                {summary}
                            </motion.p>
                        </motion.div>
                    </div>
                    {/* End Card Content Wrapper */}
                </motion.div>
            </motion.div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        onClick={handleClose}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-kaiwa-emerald/90 via-kaiwa-sage/85 to-kaiwa-emerald/90 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Modal Card */}
                        <motion.div
                            layoutId={id}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-white via-kaiwa-bg to-kaiwa-sage/30 rounded-2xl overflow-hidden shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            {/* Background Image (Blurred) */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
                                style={{
                                    backgroundImage: `url(${backgroundImage})`,
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 p-8 max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        {icon && (
                                            <div className="text-kaiwa-emerald">
                                                {icon}
                                            </div>
                                        )}
                                        <h2 className="text-4xl md:text-5xl font-bold text-kaiwa-onyx">
                                            {title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="text-kaiwa-onyx/70 hover:text-kaiwa-onyx transition-colors p-2 hover:bg-kaiwa-emerald/10 rounded-full"
                                    >
                                        <X size={32} />
                                    </button>
                                </div>
                                <div className="text-kaiwa-onyx prose max-w-none prose-headings:text-kaiwa-onyx prose-p:text-kaiwa-onyx/90 prose-li:text-kaiwa-onyx/90 prose-strong:text-kaiwa-emerald prose-a:text-kaiwa-emerald">
                                    {content}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
