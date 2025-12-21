'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { boardConfigs } from '@/lib/pieces';

interface BoardSelectionProps {
  player: 'naomy' | 'papa';
  onSelectBoard: (boardId: string) => void;
  onBack: () => void;
}

export const BoardSelection = ({ player, onSelectBoard, onBack }: BoardSelectionProps) => {
  const isNaomy = player === 'naomy';
  
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <button 
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-full backdrop-blur-sm transition-all flex items-center gap-2 mx-auto border border-white/10"
        >
          ← Changer de joueur
        </button>
        <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          🏰 Choisis ton Arène 🏰
        </h2>
        <p className="text-xl text-white/80 font-medium">
          {isNaomy ? '🐨 Naomy' : '🐓 Papa'}, où veux-tu livrer bataille ?
        </p>
      </motion.div>

      {/* Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {boardConfigs.map((board, index) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectBoard(board.id)}
            className="cursor-pointer group h-full"
          >
            <div className={`
              h-full flex flex-col
              relative bg-slate-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border-2 
              transition-all duration-300 
              ${isNaomy 
                ? 'border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]' 
                : 'border-orange-500/30 hover:border-orange-400 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]'
              }
            `}>
              {/* Board Preview Image */}
              <div className="aspect-square relative m-3 rounded-xl overflow-hidden bg-black/40">
                <Image
                  src={board.imagePath}
                  alt={board.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                
                {/* Overlay shine on hover */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info content */}
              <div className="p-4 flex-1 flex flex-col items-center text-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg text-white mb-1 group-hover:scale-105 transition-transform">
                    {board.name}
                  </h3>
                  <p className="text-white/60 text-xs">
                    {board.description}
                  </p>
                </div>
                
                <div className={`
                  w-full py-2 px-4 rounded-lg font-bold text-white text-sm uppercase tracking-wide
                  transition-all duration-300 shadow-md
                  ${isNaomy 
                    ? 'bg-linear-to-r from-pink-500 to-purple-600 group-hover:from-pink-400 group-hover:to-purple-500' 
                    : 'bg-linear-to-r from-orange-500 to-red-600 group-hover:from-orange-400 group-hover:to-red-500'
                  }
                `}>
                  COMBATTRE ICI
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

