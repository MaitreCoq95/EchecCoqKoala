'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BoardSelection } from '@/components/game/BoardSelection';
import Image from 'next/image';
import { useGameStore } from '@/lib/store';

type GameStep = 'home' | 'mode-select' | 'player-select' | 'board-select';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<GameStep>('home');
  const [selectedPlayer, setSelectedPlayer] = useState<'naomy' | 'papa' | null>(null);
  const setGameMode = useGameStore((state) => state.setGameMode);

  const handlePlayClick = () => {
    setStep('mode-select');
  };

  const handleSelectMode = (mode: 'classic' | 'powers') => {
    setGameMode(mode);
    setStep('player-select');
  };

  const handleSelectPlayer = (player: 'naomy' | 'papa') => {
    setSelectedPlayer(player);
    setStep('board-select');
  };

  const handleSelectBoard = (boardId: string) => {
    router.push(`/game?player=${selectedPlayer}&board=${boardId}`);
  };

  const handleBack = () => {
    if (step === 'board-select') {
      setStep('player-select');
      setSelectedPlayer(null);
    } else if (step === 'player-select') {
      setStep('mode-select');
    } else if (step === 'mode-select') {
      setStep('home');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-radial from-yellow-500/10 to-transparent rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 text-center space-y-8 max-w-4xl w-full flex flex-col items-center"
          >
            {/* Logo Title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-2xl">
                🐓 CocoriChest ♟️
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-medium mt-4">
                Le jeu d&apos;échecs épique : Magie vs Muscles !
              </p>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
            >
              <Image
                src="/assets/ui/hero-cocorichest.png"
                alt="CocoriChest - Jeu d'échecs épique"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Play Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <button 
                onClick={handlePlayClick}
                className="transform hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none group"
              >
                <div className="relative">
                  <Image
                    src="/assets/ui/btn-play.png"
                    alt="Jouer"
                    width={320}
                    height={100}
                    className="drop-shadow-2xl group-hover:drop-shadow-[0_0_30px_rgba(255,200,0,0.5)]"
                  />
                </div>
              </button>

              <button 
                onClick={() => router.push('/multiplayer')}
                className="transform hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none group"
              >
                <div className="relative">
                  <Image
                    src="/assets/ui/btn-new-game.png"
                    alt="Nouvelle Partie Multijoueur"
                    width={280}
                    height={80}
                    className="drop-shadow-xl group-hover:drop-shadow-[0_0_20px_rgba(100,200,255,0.5)]"
                  />
                </div>
              </button>
            </motion.div>

            {/* Army Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-16 pt-8"
            >
              <div className="text-center space-y-3 group cursor-pointer">
                <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform overflow-hidden relative">
                  <Image
                    src="/assets/ui/badge-naomy.png"
                    alt="Badge Armée Naomy"
                    width={128}
                    height={128}
                    className="object-contain drop-shadow-md"
                  />
                </div>
                <p className="text-purple-300 font-bold text-xl">Armée Naomy</p>
                <p className="text-purple-400/70 text-sm">Koala Queen Army</p>
              </div>
              
              <div className="text-center space-y-3 group cursor-pointer">
                <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform overflow-hidden relative">
                  <Image
                    src="/assets/ui/badge-vivien.png"
                    alt="Badge Armée Vivien"
                    width={128}
                    height={128}
                    className="object-contain drop-shadow-md"
                  />
                </div>
                <p className="text-orange-300 font-bold text-xl">Armée Vivien</p>
                <p className="text-orange-400/70 text-sm">Titan Rooster Empire</p>
              </div>
            </motion.div>
          </motion.div>
        ) : step === 'mode-select' ? (
          <motion.div
            key="mode-select"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="z-10 text-center space-y-8 max-w-4xl w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={handleBack}
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-full backdrop-blur-sm transition-all flex items-center gap-2 mx-auto border border-white/10 mb-6"
              >
                ← Retour
              </button>
              <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                ⚙️ Choisis ton Mode ⚙️
              </h2>
              <p className="text-xl text-white/80 font-medium mt-4">
                Échecs classiques ou avec super-pouvoirs ?
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
              {/* Classic Mode */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectMode('classic')}
                className="p-8 bg-slate-800/80 rounded-3xl border-4 border-slate-600 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all"
              >
                <div className="text-6xl mb-4">♟️</div>
                <h3 className="text-3xl font-bold text-white mb-2">Mode Classique</h3>
                <p className="text-white/60">Échecs purs, sans pouvoirs</p>
                <p className="text-blue-400 text-sm mt-2">Stratégie traditionnelle</p>
              </motion.button>

              {/* Powers Mode */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectMode('powers')}
                className="p-8 bg-linear-to-br from-purple-800/80 to-pink-800/80 rounded-3xl border-4 border-purple-500 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all"
              >
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-3xl font-bold text-white mb-2">Mode Pouvoirs</h3>
                <p className="text-white/60">Échecs + super-pouvoirs !</p>
                <p className="text-pink-400 text-sm mt-2">Gel, Bouclier, Téléportation...</p>
              </motion.button>
            </div>
          </motion.div>
        ) : step === 'player-select' ? (
          <motion.div
            key="player-select"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="z-10 text-center space-y-8 max-w-4xl w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                🏰 Choisis ton Camp ! 🏰
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4">
              {/* Naomy Side */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => handleSelectPlayer('naomy')}
              >
                <div className="h-full flex flex-col items-center justify-between gap-6 p-8 rounded-3xl bg-linear-to-br from-pink-500/30 to-purple-600/30 backdrop-blur-md border-4 border-pink-400/50 hover:border-pink-300 transition-colors shadow-2xl">
                  <div className="relative w-40 h-40 animate-bounce" style={{ animationDuration: '3s' }}>
                    <Image
                      src="/assets/ui/badge-naomy.png"
                      alt="Badge Naomy"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-pink-200">Je suis Naomy</h2>
                    <p className="text-pink-300/80">Team Koala Queen Army</p>
                  </div>
                  <div className="w-full py-4 px-8 bg-linear-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-white text-xl shadow-lg hover:shadow-pink-500/50 transition-shadow">
                    Jouer avec Magie ✨
                  </div>
                </div>
              </motion.div>

              {/* Papa Side */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => handleSelectPlayer('papa')}
              >
                <div className="h-full flex flex-col items-center justify-between gap-6 p-8 rounded-3xl bg-linear-to-br from-orange-500/30 to-red-600/30 backdrop-blur-md border-4 border-orange-400/50 hover:border-orange-300 transition-colors shadow-2xl">
                  <div className="relative w-40 h-40 animate-pulse" style={{ animationDuration: '3s' }}>
                    <Image
                      src="/assets/ui/badge-vivien.png"
                      alt="Badge Papa"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-orange-200">Je suis Papa</h2>
                    <p className="text-orange-300/80">Team Coq Titan Army</p>
                  </div>
                  <div className="w-full py-4 px-8 bg-linear-to-r from-orange-500 to-red-500 rounded-xl font-bold text-white text-xl shadow-lg hover:shadow-orange-500/50 transition-shadow">
                    Jouer avec Puissance ⚡
                  </div>
                </div>
              </motion.div>
            </div>

            <button
              onClick={handleBack}
              className="mt-8 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg text-lg backdrop-blur-sm border border-white/20 transition-all"
            >
              ← Retour
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="board-select"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="z-10 w-full"
          >
            <BoardSelection 
              player={selectedPlayer!}
              onSelectBoard={handleSelectBoard}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
