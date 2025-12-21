'use client';

import { motion } from 'framer-motion';
import { Power } from '@/lib/powers';
import { Player } from '@/lib/types';

interface PowerBarProps {
  power: Power;
  onClick: () => void;
  disabled: boolean;
}

const PowerBar = ({ power, onClick, disabled }: PowerBarProps) => {
  const isReady = power.currentCharge >= 100;
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || !isReady}
      whileHover={isReady ? { scale: 1.02 } : {}}
      whileTap={isReady ? { scale: 0.98 } : {}}
      className={`
        w-full p-3 rounded-xl transition-all duration-300 relative overflow-visible group
        ${isReady 
          ? 'bg-linear-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 cursor-pointer shadow-lg' 
          : 'bg-white/5 cursor-not-allowed opacity-70'
        }
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      {/* Glow effect when ready */}
      {isReady && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-xl"
          style={{ 
            boxShadow: `0 0 20px ${power.color}50, inset 0 0 20px ${power.color}20`
          }}
        />
      )}
      
      <div className="relative z-10 flex items-center gap-3">
        {/* Emoji Icon */}
        <span className="text-2xl">{power.emoji}</span>
        
        {/* Power Info */}
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-white">{power.name}</span>
            <span className={`text-xs font-bold ${isReady ? 'text-green-400' : 'text-white/60'}`}>
              {Math.floor(power.currentCharge)}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${power.currentCharge}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full rounded-full relative"
              style={{ 
                backgroundColor: power.color,
                boxShadow: isReady ? `0 0 10px ${power.color}` : 'none'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </motion.div>
          </div>
        </div>
        
        {/* Ready indicator */}
        {isReady && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-lg"
          >
            ✨
          </motion.span>
        )}
      </div>
      
      {/* Tooltip - shows on hover */}
      <div className="absolute left-0 right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-slate-900/95 text-white text-xs rounded-lg px-3 py-2 mx-2 shadow-xl border border-white/10">
          <p className="font-bold text-yellow-400 mb-1">{power.name}</p>
          <p className="text-white/80">{power.description}</p>
        </div>
      </div>
    </motion.button>
  );
};

interface PowerPanelProps {
  player: Player;
  powers: Power[];
  onActivatePower: (powerId: string) => void;
  disabled: boolean;
}

export const PowerPanel = ({ player, powers, onActivatePower, disabled }: PowerPanelProps) => {
  const isNaomy = player === 'naomy';
  
  // Calculate total energy as average of all powers
  const totalEnergy = Math.floor(powers.reduce((sum, p) => sum + p.currentCharge, 0) / powers.length);
  
  return (
    <div className={`
      rounded-xl p-2 space-y-2 backdrop-blur-sm text-sm
      ${isNaomy 
        ? 'bg-linear-to-br from-pink-500/20 to-purple-500/20 border border-pink-400/30' 
        : 'bg-linear-to-br from-orange-500/20 to-red-500/20 border border-orange-400/30'
      }
    `}>
      {/* Header with total energy */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{isNaomy ? '🐨' : '🐓'}</span>
          <span className="font-bold text-white">
            {isNaomy ? 'Armée Naomy' : 'Armée Vivien'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Énergie:</span>
          <span className="text-lg font-bold text-yellow-400">{totalEnergy}%</span>
        </div>
      </div>
      
      {/* Global energy bar */}
      <div className="h-3 bg-black/30 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${totalEnergy}%` }}
          className={`h-full rounded-full ${
            isNaomy 
              ? 'bg-linear-to-r from-pink-400 to-purple-400' 
              : 'bg-linear-to-r from-orange-400 to-red-400'
          }`}
        />
      </div>
      
      {/* Power bars */}
      <div className="space-y-2">
        {powers.map(power => (
          <PowerBar
            key={power.id}
            power={power}
            onClick={() => onActivatePower(power.id)}
            disabled={disabled}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="text-xs text-white/40 text-center pt-2 border-t border-white/10">
        {isNaomy ? '✨ Magie & Amour ✨' : '⚔️ Force & Courage ⚔️'}
      </div>
    </div>
  );
};
