import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Loader2, Globe } from 'lucide-react';

// Knowledge base type
interface KnowledgeResponse {
    id: string;
    keywords: string[];
    answer_en: string;
    answer_ja: string;
}

interface KnowledgeBase {
    responses: KnowledgeResponse[];
    default_response_en: string;
    default_response_ja: string;
}

export const Chatbot: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [language, setLanguage] = useState<'en' | 'ja'>('en');
    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null);

    // Refs for speech synthesis and recognition
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionRef = useRef<any>(null);

    const speakResponse = useCallback((text: string) => {
        if (synthesisRef.current) {
            // Cancel any ongoing speech
            synthesisRef.current.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (e) => {
                console.error("Speech synthesis error", e);
                setIsSpeaking(false);
            };
            synthesisRef.current.speak(utterance);
        }
    }, []);

    const processCommand = useCallback((text: string) => {
        setIsProcessing(true);

        // Mock Logic simulated delay
        setTimeout(() => {
            if (!knowledgeBase) {
                setResponse("Knowledge base not loaded. Please refresh the page.");
                setIsProcessing(false);
                return;
            }

            const lowerText = text.toLowerCase();
            let answer = language === 'en'
                ? knowledgeBase.default_response_en
                : knowledgeBase.default_response_ja;

            // Search through knowledge base for matching keywords
            for (const item of knowledgeBase.responses) {
                const hasMatch = item.keywords.some(keyword =>
                    lowerText.includes(keyword.toLowerCase())
                );

                if (hasMatch) {
                    answer = language === 'en' ? item.answer_en : item.answer_ja;
                    break;
                }
            }

            setResponse(answer);
            setIsProcessing(false);
            speakResponse(answer);
        }, 1000);
    }, [speakResponse, knowledgeBase, language]);

    useEffect(() => {
        // Load knowledge base from JSON
        fetch('/chatbot-knowledge.json')
            .then(res => res.json())
            .then(data => setKnowledgeBase(data))
            .catch(err => {
                console.error('Failed to load knowledge base:', err);
                setError('Failed to load chatbot data.');
            });

        // Initialize Speech Setup
        if ('speechSynthesis' in window) {
            synthesisRef.current = window.speechSynthesis;
        }

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1; // Safari fix
            recognitionRef.current.lang = language === 'en' ? 'en-US' : 'ja-JP';

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setError('');
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recognitionRef.current.onresult = (event: any) => {
                // Safari fix: check if results exist and have data
                if (event.results && event.results.length > 0 && event.results[0].length > 0) {
                    const text = event.results[0][0].transcript;
                    console.log('Speech recognized:', text); // Debug log
                    setTranscript(text);
                    processCommand(text);
                } else {
                    console.error('No speech results received');
                    setError('Could not understand. Please try again.');
                }
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);

                // Safari-specific error messages
                if (event.error === 'no-speech') {
                    setError('No speech detected. Please try again.');
                } else if (event.error === 'audio-capture') {
                    setError('Microphone not accessible. Check permissions.');
                } else if (event.error === 'not-allowed') {
                    setError('Microphone permission denied.');
                } else {
                    setError('Could not hear you. Please try again.');
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError('Voice not supported in this browser.');
        }

        return () => {
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
        };
    }, [processCommand, language]);

    const startListening = () => {
        if (recognitionRef.current && !isListening && !isSpeaking) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error('Error starting speech recognition:', e);
                setError('Could not start microphone. Please try again.');
            }
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative z-20">
            {/* Gradient border wrapper */}
            <div className="p-[2px] rounded-3xl bg-gradient-to-br from-kaiwa-emerald via-kaiwa-sage to-kaiwa-emerald bg-[length:200%_200%] animate-gradient">
                <motion.div
                    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(11,93,30,0.15)] overflow-hidden"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                >
                    <div className="p-6 flex flex-col items-center text-center">
                        {/* Language Toggle */}
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={() => setLanguage(prev => prev === 'en' ? 'ja' : 'en')}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-kaiwa-emerald/10 hover:bg-kaiwa-emerald/20 transition-all duration-200 text-kaiwa-emerald text-sm font-medium cursor-pointer hover:shadow-md"
                                title="Switch language"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{language === 'en' ? '🇺🇸 EN' : '🇯🇵 JA'}</span>
                            </button>
                        </div>

                        <h3 className="text-kaiwa-emerald font-bold text-lg mb-2">
                            {language === 'en' ? 'Kaiwa Bot' : '会話ボット'}
                        </h3>
                        <p className="text-kaiwa-onyx/60 text-sm mb-6">
                            {language === 'en'
                                ? 'Ask about the schedule, resources, or how to join.'
                                : 'スケジュール、リソース、参加方法について聞いてください。'}
                        </p>

                        <div className="relative mb-6">
                            {/* Visualizer Circle */}
                            <motion.div
                                className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isListening ? 'bg-red-500' : isSpeaking ? 'bg-kaiwa-sage' : 'bg-kaiwa-emerald'
                                    }`}
                                onClick={isListening ? stopListening : startListening}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                animate={isListening ? { scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px 0px rgba(239, 68, 68, 0.7)", "0px 0px 0px 20px rgba(239, 68, 68, 0)"] } : {}}
                                transition={isListening ? { repeat: Infinity, duration: 1.5 } : {}}
                            >
                                <AnimatePresence mode='wait'>
                                    {isListening ? (
                                        <Mic key="listening" className="text-white w-8 h-8" />
                                    ) : isSpeaking ? (
                                        <Volume2 key="speaking" className="text-white w-8 h-8" />
                                    ) : isProcessing ? (
                                        <Loader2 key="processing" className="text-white w-8 h-8 animate-spin" />
                                    ) : (
                                        <MicOff key="idle" className="text-white/80 w-8 h-8" />
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        <AnimatePresence>
                            {transcript && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="w-full text-left bg-gray-100 rounded-lg p-3 mb-2 text-sm text-gray-700"
                                >
                                    <span className="font-bold text-xs text-gray-400 block mb-1">YOU</span>
                                    "{transcript}"
                                </motion.div>
                            )}
                            {response && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                                    className="w-full text-left bg-kaiwa-emerald/10 rounded-lg p-3 text-sm text-kaiwa-emerald"
                                >
                                    <span className="font-bold text-xs text-kaiwa-emerald/50 block mb-1">BOT</span>
                                    "{response}"
                                </motion.div>
                            )}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="text-red-500 text-xs mt-2"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
