import { Piece, Player } from '@/lib/types';
import { THEME_NAOMY, THEME_PAPA } from '@/lib/themes';
import { Card } from '@/components/ui/Card';
import { ChessPiece } from './ChessPiece';
import { motion } from 'framer-motion';

interface PlayerPanelProps {
  player: Player;
  isActive: boolean;
  capturedPieces: Piece[];
  energy: number;
}

export const PlayerPanel = ({ player, isActive, capturedPieces, energy }: PlayerPanelProps) => {
  const theme = player === 'naomy' ? THEME_NAOMY : THEME_PAPA;
  const isNaomy = player === 'naomy';

  return (
    <Card
      theme={player}
      className={`flex flex-col gap-4 transition-all duration-300 ${
        isActive ? 'ring-4 ring-offset-2 ring-offset-slate-100 scale-105' : 'opacity-80 scale-95'
      } ${isNaomy ? 'ring-naomy-primary' : 'ring-papa-secondary'}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl animate-bounce-slow">
          {isNaomy ? '🐨' : '🐓'}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isNaomy ? 'text-naomy-primary' : 'text-blue-400'}`}>
            {theme.name}
          </h3>
          <p className="text-sm opacity-70">
            {isActive ? 'À toi de jouer !' : 'En attente...'}
          </p>
        </div>
      </div>

      {/* Energy Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-70">
          <span>Énergie</span>
          <span>{energy}%</span>
        </div>
        <div className="h-4 bg-slate-200/50 rounded-full overflow-hidden border border-slate-300/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${energy}%` }}
            className={`h-full ${
              isNaomy ? 'bg-linear-to-r from-naomy-primary to-naomy-secondary' : 'bg-linear-to-r from-papa-primary to-papa-secondary'
            }`}
          />
        </div>
      </div>

      {/* Captured Pieces */}
      <div className="min-h-[60px] bg-black/5 rounded-lg p-2 flex flex-wrap gap-1 content-start">
        {capturedPieces.length === 0 && (
          <span className="text-xs opacity-40 w-full text-center py-2">Aucune capture</span>
        )}
        {capturedPieces.map((piece) => (
          <div key={piece.id} className="w-6 h-6">
            <ChessPiece piece={piece} />
          </div>
        ))}
      </div>
    </Card>
  );
};
