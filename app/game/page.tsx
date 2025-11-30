'use client';

import { useSearchParams } from 'next/navigation';
import { ChessBoard } from '@/components/game/ChessBoard';
import { PlayerPanel } from '@/components/game/PlayerPanel';
import { TopBar } from '@/components/game/TopBar';
import { EndGameModal } from '@/components/game/EndGameModal';
import { useGameStore } from '@/lib/store';
import { Player } from '@/lib/types';

import { Suspense } from 'react';

import { SuperPowerMenu } from '@/components/game/SuperPowerMenu';
import { ThemeLegend } from '@/components/game/ThemeLegend';

function GameContent() {
  const searchParams = useSearchParams();
  const playerParam = searchParams.get('player') as Player | null;
  const playerView = playerParam === 'papa' ? 'papa' : 'naomy';

  const { turn, capturedByNaomy, capturedByPapa, energyNaomy, energyPapa, setActivePower, activePower } = useGameStore();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center overflow-hidden">
      <TopBar />

      <div className="flex-1 w-full max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8 items-start justify-items-center">
        
        {/* Left Panel (Naomy) */}
        <div className="w-full max-w-sm order-2 lg:order-1 flex flex-col gap-4">
          <PlayerPanel 
            player="naomy" 
            isActive={turn === 'naomy'} 
            capturedPieces={capturedByNaomy}
            energy={energyNaomy}
          />
          {playerView === 'naomy' && (
            <SuperPowerMenu 
              player="naomy" 
              energy={energyNaomy} 
              onActivate={setActivePower} 
              disabled={turn !== 'naomy'}
            />
          )}
          <div className="hidden lg:block">
             <ThemeLegend />
          </div>
        </div>

        {/* Center Board */}
        <div className="order-1 lg:order-2 w-full flex flex-col items-center gap-4">
          <ChessBoard playerView={playerView} />
          {activePower && (
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full animate-bounce font-bold border-2 border-yellow-400">
              ⚡ POUVOIR ACTIVÉ : {activePower.toUpperCase()} ! Sélectionnez une cible.
            </div>
          )}
        </div>

        {/* Right Panel (Papa) */}
        <div className="w-full max-w-sm order-3 lg:order-3 flex flex-col gap-4">
          <PlayerPanel 
            player="papa" 
            isActive={turn === 'papa'} 
            capturedPieces={capturedByPapa}
            energy={energyPapa}
          />
          {playerView === 'papa' && (
            <SuperPowerMenu 
              player="papa" 
              energy={energyPapa} 
              onActivate={setActivePower} 
              disabled={turn !== 'papa'}
            />
          )}
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
