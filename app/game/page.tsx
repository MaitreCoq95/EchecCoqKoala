'use client';

import { useSearchParams } from 'next/navigation';
import { ChessBoard } from '@/components/game/ChessBoard';
import { PlayerPanel } from '@/components/game/PlayerPanel';
import { TopBar } from '@/components/game/TopBar';
import { EndGameModal } from '@/components/game/EndGameModal';
import { useGameStore } from '@/lib/store';
import { Player } from '@/lib/types';

import { Suspense } from 'react';

function GameContent() {
  const searchParams = useSearchParams();
  const playerParam = searchParams.get('player') as Player | null;
  const playerView = playerParam === 'papa' ? 'papa' : 'naomy';

  const { turn, capturedByNaomy, capturedByPapa, energyNaomy, energyPapa } = useGameStore();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center overflow-hidden">
      <TopBar />

      <div className="flex-1 w-full max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8 items-start justify-items-center">
        
        {/* Left Panel (Naomy usually, or Player 1) */}
        <div className="w-full max-w-sm order-2 lg:order-1">
          <PlayerPanel 
            player="naomy" 
            isActive={turn === 'naomy'} 
            capturedPieces={capturedByNaomy}
            energy={energyNaomy}
          />
        </div>

        {/* Center Board */}
        <div className="order-1 lg:order-2 w-full flex justify-center">
          <ChessBoard playerView={playerView} />
        </div>

        {/* Right Panel (Papa usually, or Player 2) */}
        <div className="w-full max-w-sm order-3 lg:order-3">
          <PlayerPanel 
            player="papa" 
            isActive={turn === 'papa'} 
            capturedPieces={capturedByPapa}
            energy={energyPapa}
          />
        </div>

      </div>
      
      <EndGameModal />
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <GameContent />
    </Suspense>
  );
}
