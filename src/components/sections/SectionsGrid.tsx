import React from 'react';
import { ExpandableCard3D } from './ExpandableCard3D';

export const SectionsGrid: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4 py-8 mt-32 justify-center items-stretch">


            <ExpandableCard3D
                id="about"
                title="About Us"
                summary="Learn about the Japanese Conversation and Culture Club."

                backgroundImage="/About.webp"
                content={
                    <div>
                        <p className="mb-4 text-kaiwa-onyx/80">
                            The <strong className="text-kaiwa-onyx">Japanese Conversation and Culture Club</strong> is an environment where students learning Japanese can come and practice speaking Japanese through fun activities.
                        </p>
                        <p className="mb-4 text-kaiwa-onyx/80">
                            We aim to provide a safe and encouraging space for language learners of all levels to improve their speaking skills and deepen their understanding of Japanese culture.
                        </p>
                        <p className="mb-4text-kaiwa-onyx/80">
                            You can check out all the activities that we have done so far on our Instagram or GroupMe.
                        </p>
                    </div>
                }
            />

            <ExpandableCard3D
                id="socials"
                title="Socials"
                summary="Connect with us on social media."

                backgroundImage="/Socials.webp"
                content={
                    <div className="flex flex-col gap-4">
                        <a
                            href="https://www.instagram.com/tukaiwaclub/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors cursor-pointer border-2 border-kaiwa-emerald/30 hover:border-kaiwa-emerald/60"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-8 h-8" />
                            <div>
                                <h4 className="font-bold text-kaiwa-onyx">Instagram</h4>
                                <p className="text-sm text-kaiwa-onyx/70">Check out our latest posts and stories!</p>
                            </div>
                        </a>
                        <a
                            href="https://groupme.com/join_group/109498430/ddgTF4d6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors cursor-pointer border-2 border-kaiwa-emerald/30 hover:border-kaiwa-emerald/60"
                        >

                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
                            <div>
                                <h4 className="font-bold text-kaiwa-onyx">GroupMe</h4>
                                <p className="text-sm text-kaiwa-onyx/70">Join our group chat</p>
                            </div>
                        </a>
                    </div>
                }
            />

            <ExpandableCard3D
                id="resources"
                title="Resources"
                summary="Tools to help you learn Japanese."

                backgroundImage="/Resources.webp"
                content={
                    <div className="flex flex-col gap-4">
                        <a
                            href="https://ricoapps.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors cursor-pointer border-2 border-kaiwa-emerald/30 hover:border-kaiwa-emerald/60"
                        >
                            <h4 className="font-bold text-kaiwa-emerald mb-2">Shirabe Jisho</h4>
                            <p className="text-sm text-kaiwa-onyx/70">Shirabe Jisho (by RicoApps) is a clean and powerful Japanese-English dictionary app featuring fast search by kanji, kana, romaji, radicals, or English, plus stroke order animations and detailed example sentences. It offers customizable study tools like flashcards and word lists, JLPT level tagging, and quick lookup of grammar and usage notes. Designed for learners of all levels, it combines intuitive search with helpful learning aids in a simple mobile interface. PS: only available on IOS.</p>
                        </a>
                        <a
                            href="https://www.japaneseapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors cursor-pointer border-2 border-kaiwa-emerald/30 hover:border-kaiwa-emerald/60"
                        >
                            <h4 className="font-bold text-kaiwa-emerald mb-2">Japanese App</h4>
                            <p className="text-sm text-kaiwa-onyx/70">JapaneseApp is a comprehensive Japanese dictionary and study tool featuring a large offline word database, handwriting recognition for kanji lookup, and a powerful text reader that breaks down sentences for easier understanding. It includes flashcards, JLPT vocabulary lists, memory lists, and predictive search by radicals or kanji. Designed for both beginners and advanced learners, it combines fast lookup with structured study features in one mobile platform.</p>
                        </a>
                        <a
                            href="https://jisho.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors cursor-pointer border-2 border-kaiwa-emerald/30 hover:border-kaiwa-emerald/60"
                        >
                            <h4 className="font-bold text-kaiwa-emerald mb-2">Jisho.org</h4>
                            <p className="text-sm text-kaiwa-onyx/70">Jisho.org is a free online Japanese dictionary that lets you quickly look up words, kanji, and phrases with example sentences and audio pronunciations. It supports search by English, romaji, kana, kanji, radicals, or stroke count, and shows detailed definitions, JLPT levels, and usage notes. Widely used by learners worldwide, it's simple, fast, and great for both beginner vocabulary and advanced Japanese study.</p>
                        </a>
                    </div>
                }
            />

            < ExpandableCard3D
                id="jlpt"
                title="JLPT Info"
                summary="Information about the Japanese Language Proficiency Test."

                backgroundImage="/Jlpt.webp"
                content={
                    < div >
                        <p className="mb-4 text-kaiwa-onyx/80">
                            The <strong className="text-kaiwa-onyx">Japanese-Language Proficiency Test (JLPT)</strong> is a standardized criterion-referenced test to evaluate and certify Japanese language proficiency for non-native speakers.
                        </p>
                        <h4 className="font-bold mb-2 text-kaiwa-onyx">Levels:</h4>
                        <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li><strong>N5</strong>: Basic understanding of some basic Japanese.</li>
                            <li><strong>N4</strong>: Basic understanding of basic Japanese.</li>
                            <li><strong>N3</strong>: Ability to understand Japanese used in everyday situations to a certain degree.</li>
                            <li><strong>N2</strong>: Ability to understand Japanese used in everyday situations, and in a variety of circumstances to a certain degree.</li>
                            <li><strong>N1</strong>: Ability to understand Japanese used in a variety of circumstances.</li>
                        </ul>
                        <p className="mb-4 text-kaiwa-onyx/80">
                            <strong>You can find more information about the examination <a href="https://jlpt.us/" target="_blank" rel="noopener noreferrer" className="text-kaiwa-emerald hover:underline">here</a>.</strong>
                        </p>
                        <p className="text-sm bg-yellow-500/20 p-4 rounded-lg text-yellow-900 border-l-4 border-yellow-600">
                            <strong className="text-yellow-950">Note:</strong> The exam is held twice a year in Japan and selected countries (July and December). In the US, it is typically held only in December.
                        </p>
                    </div >
                }
            />

        </div >
    );
};
