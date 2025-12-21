'use client';

import { useSearchParams } from 'next/navigation';
import { ChessBoard } from '@/components/game/ChessBoard';
import { PlayerPanel } from '@/components/game/PlayerPanel';
import { TopBar } from '@/components/game/TopBar';
import { EndGameModal } from '@/components/game/EndGameModal';
import { PowerPanel } from '@/components/game/PowerPanel';
import { useGameStore } from '@/lib/store';
import { Player } from '@/lib/types';
import { Suspense, useEffect } from 'react';
import { gameService } from '@/lib/gameService';

// ... (existing imports)

function GameContent() {
  const searchParams = useSearchParams();
  const playerParam = searchParams.get('player') as Player | null;
  const boardId = searchParams.get('board') || 'split-dual';
  const playerView = playerParam === 'papa' ? 'papa' : 'naomy';

  const { 
    turn, 
    capturedByNaomy, 
    capturedByPapa, 
    energyNaomy, 
    energyPapa, 
    activePower,
    naomyPowers,
    vivienPowers,
    activatePower,
    setActivePower,
    initGame,
    setBoardState,
    setGameId,
    syncGameState,
    gameMode // Added for classic/powers mode
  } = useGameStore();

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      // Initialize local game if no code
      initGame();
      return;
    }

    // 1. Set Game ID in Store (enables multiplayer logic)
    setGameId(code);

    // 2. Initial Fetch (to ensure we have latest state)
    gameService.getGame(code).then(game => {
      if (game) {
        syncGameState({
          board: game.board_state,
          turn: game.current_turn,
          status: game.status,
          winner: game.winner as Player | null,
        });
      }
    });

    // 3. Subscribe to Real-time Updates
    const unsubscribe = gameService.subscribeToGame(code, (updatedGame) => {
      console.log("Received Game Update:", updatedGame);
      syncGameState({
        board: updatedGame.board_state,
        turn: updatedGame.current_turn,
        status: updatedGame.status,
        winner: updatedGame.winner as Player | null,
      });
    });

    return () => {
      unsubscribe();
      setGameId(null); // Reset on leave
    };
  }, [code, initGame, setBoardState, setGameId, syncGameState]);

  // ... (inside render)
  const handleCancelPower = () => {
    setActivePower(null);
  };



  if (code && !boardId) {
     // If waiting for opponent in multiplayer
     return (
        <main className="min-h-screen bg-cover bg-center bg-fixed relative flex flex-col items-center justify-center text-white"
              style={{ backgroundImage: 'url(/assets/backgrounds/game-background.png)' }}>
          <div className="bg-black/60 p-8 rounded-2xl backdrop-blur-md text-center max-w-md border border-white/20">
             <h2 className="text-3xl font-bold mb-4">En attente d&apos;un adversaire...</h2>
             <p className="mb-6 opacity-80">Partage ce code à ton ami :</p>
             <div className="text-5xl font-mono font-bold text-yellow-400 tracking-widest bg-white/10 p-4 rounded-xl mb-6 select-all">
               {code}
             </div>
             <div className="animate-spin text-4xl">⏳</div>
          </div>
        </main>
     );
  }

  return (
    <main className="min-h-screen bg-cover bg-center bg-fixed relative flex flex-col items-center overflow-hidden"
          style={{ backgroundImage: 'url(/assets/backgrounds/game-background.png)' }}>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/40 pointer-events-none" />
      
      <div className="relative z-10 w-full flex flex-col items-center h-full">
      <TopBar />

      <div className="flex-1 w-full max-w-7xl p-2 grid grid-cols-1 lg:grid-cols-[180px_1fr_180px] gap-3 items-start justify-items-center">
        
        {/* Left Panel (Naomy) */}
        <div className="w-full max-w-sm order-2 lg:order-1 flex flex-col gap-4">
          <PlayerPanel 
            player="naomy" 
            isActive={turn === 'naomy'} 
            capturedPieces={capturedByNaomy}
            energy={energyNaomy}
          />
          {gameMode === 'powers' && (
            <PowerPanel 
              player="naomy" 
              powers={naomyPowers}
              onActivatePower={activatePower}
              disabled={turn !== 'naomy'}
            />
          )}
        </div>

        {/* Center Board */}
        <div className="order-1 lg:order-2 w-full flex flex-col items-center gap-4">
          <ChessBoard playerView={playerView} boardId={boardId} />
          
          {/* Active power indicator */}
          {activePower && (
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-pulse">
                ⚡ POUVOIR : {activePower.toUpperCase()} - Sélectionnez une cible !
              </div>
              <button 
                onClick={handleCancelPower}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold transition-colors"
              >
                ✕ Annuler
              </button>
            </div>
          )}
          
          {/* Turn indicator */}
          <div className={`
            px-6 py-2 rounded-full font-bold text-white shadow-lg
            ${turn === 'naomy' 
              ? 'bg-linear-to-r from-pink-500 to-purple-500' 
              : 'bg-linear-to-r from-orange-500 to-red-500'
            }
          `}>
            {turn === 'naomy' ? '🐨 Tour de Naomy' : '🐓 Tour de Vivien'}
          </div>
        </div>

        {/* Right Panel (Vivien) */}
        <div className="w-full max-w-sm order-3 lg:order-3 flex flex-col gap-4">
          <PlayerPanel 
            player="papa" 
            isActive={turn === 'papa'} 
            capturedPieces={capturedByPapa}
            energy={energyPapa}
          />
          {gameMode === 'powers' && (
            <PowerPanel 
              player="papa" 
              powers={vivienPowers}
              onActivatePower={activatePower}
              disabled={turn !== 'papa'}
            />
          )}
        </div>

      </div>
      
      <EndGameModal />
      </div>
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-2xl animate-pulse">⚔️ Préparation du champ de bataille... ⚔️</div>
      </div>
    }>
      <GameContent />
    </Suspense>
  );
}
