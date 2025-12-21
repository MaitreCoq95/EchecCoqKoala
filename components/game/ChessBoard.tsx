'use client';

import { useGameStore } from '@/lib/store';
import { ChessSquare } from './ChessSquare';
import { useEffect, useState } from 'react';
import { Player } from '@/lib/types';
import { getBoardConfig, boardConfigs, CALIBRATION_BOARD_PATH } from '@/lib/pieces';
import Image from 'next/image';

interface ChessBoardProps {
  playerView: Player;
  boardId?: string;
}

export const ChessBoard = ({ playerView, boardId: initialBoardId = 'standard' }: ChessBoardProps) => {
  // Game phase: 'calibration' (setup) or 'playing' (actual game)
  const [gamePhase, setGamePhase] = useState<'calibration' | 'playing'>('calibration');
  const [selectedBoardId, setSelectedBoardId] = useState(initialBoardId);
  const [manualFlip, setManualFlip] = useState(false);
  const [calibrationData, setCalibrationData] = useState({
    offsetX: 100,
    offsetY: 100,
    gridSize: 1848,
  });

  const { board, selectedSquare, validMoves, selectSquare, movePiece, initGame } = useGameStore();
  
  const boardConfig = getBoardConfig(selectedBoardId);

  // Constants
  const SOURCE_TOTAL_SIZE = 2048;
  const DISPLAY_SIZE = 800;

  // Proportional calculations based on dynamic calibration data
  const scale = DISPLAY_SIZE / SOURCE_TOTAL_SIZE;
  const borderOffsetX = calibrationData.offsetX * scale;
  const borderOffsetY = calibrationData.offsetY * scale;
  const gridSize = calibrationData.gridSize * scale;

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleSquareClick = (row: number, col: number) => {
    if (gamePhase !== 'playing') return; // Disable moves during calibration
    if (validMoves.some(m => m.row === row && m.col === col)) {
      movePiece({ row, col });
    } else {
      selectSquare({ row, col });
    }
  };

  const handleStartGame = () => {
    setGamePhase('playing');
  };

  // In calibration phase, show calibration board; in playing phase, show selected board
  const currentBoardImage = gamePhase === 'calibration' 
    ? CALIBRATION_BOARD_PATH
    : (boardConfig?.imagePath || '/assets/boards/board-standard.png');

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Calibration Phase Header */}
      {gamePhase === 'calibration' && (
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4 text-center animate-pulse">
          <h2 className="text-xl font-bold text-yellow-400">🛠️ Phase de Calibrage</h2>
          <p className="text-sm text-yellow-300/80">Ajustez la grille et choisissez votre plateau</p>
        </div>
      )}

      {/* Board Container */}
      <div 
        className="relative rounded-xl overflow-hidden shadow-2xl bg-slate-800"
        style={{ width: DISPLAY_SIZE, height: DISPLAY_SIZE }}
      >
        {/* Board Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentBoardImage}
            alt={boardConfig?.name || "Plateau de jeu"}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Chess Grid Overlay - Positioned precisely */}
        <div 
          className={`absolute z-10 grid grid-cols-8 grid-rows-8 gap-0 ${gamePhase === 'calibration' ? 'border-2 border-red-500 bg-red-500/10' : ''}`}
          style={{
            top: borderOffsetY,
            left: borderOffsetX,
            width: gridSize,
            height: gridSize,
          }}
        >
          {(() => {
            const isFlipped = (playerView === 'papa') !== manualFlip;
            const displayRows = isFlipped ? [...board].reverse() : board;
            
            return displayRows.map((row, r) => {
              const actualRowIndex = isFlipped ? 7 - r : r;
              const displayCols = isFlipped ? [...row].reverse() : row;

              return displayCols.map((piece, c) => {
                const actualColIndex = isFlipped ? 7 - c : c;

                return (
                  <ChessSquare
                    key={`${actualRowIndex}-${actualColIndex}`}
                    position={{ row: actualRowIndex, col: actualColIndex }}
                    piece={piece}
                    isSelected={selectedSquare?.row === actualRowIndex && selectedSquare?.col === actualColIndex}
                    isValidMove={validMoves.some(m => m.row === actualRowIndex && m.col === actualColIndex)}
                    isLastMove={false} 
                    onClick={() => handleSquareClick(actualRowIndex, actualColIndex)}
                    playerTheme={playerView}
                  />
                );
              });
            });
          })()}
        </div>
        
        {/* Decorative corners (only in playing phase) */}
        {gamePhase === 'playing' && (
          <>
            <div className="absolute top-2 left-2 text-2xl opacity-70 z-20 pointer-events-none">🏰</div>
            <div className="absolute top-2 right-2 text-2xl opacity-70 z-20 pointer-events-none">🏰</div>
            <div className="absolute bottom-2 left-2 text-2xl opacity-70 z-20 pointer-events-none">⚔️</div>
            <div className="absolute bottom-2 right-2 text-2xl opacity-70 z-20 pointer-events-none">⚔️</div>
          </>
        )}
      </div>

      {/* Calibration Controls */}
      {gamePhase === 'calibration' && (
        <div className="w-full max-w-2xl space-y-4">
          {/* Board Selector */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
            <h3 className="text-sm font-bold text-slate-300 mb-3">📋 Choisir le plateau :</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {boardConfigs.map((config) => (
                <button
                  key={config.id}
                  onClick={() => setSelectedBoardId(config.id)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    selectedBoardId === config.id
                      ? 'bg-green-500 text-white ring-2 ring-green-400'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {config.name}
                </button>
              ))}
            </div>
          </div>

          {/* Calibration Sliders */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
            <h3 className="text-sm font-bold text-slate-300 mb-3">🔧 Réglages de la grille :</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400">Offset X: {calibrationData.offsetX}px</label>
                <input 
                  type="range" 
                  min="0" 
                  max="300" 
                  value={calibrationData.offsetX}
                  onChange={(e) => setCalibrationData(prev => ({ ...prev, offsetX: Number(e.target.value) }))}
                  className="accent-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400">Offset Y: {calibrationData.offsetY}px</label>
                <input 
                  type="range" 
                  min="0" 
                  max="300" 
                  value={calibrationData.offsetY}
                  onChange={(e) => setCalibrationData(prev => ({ ...prev, offsetY: Number(e.target.value) }))}
                  className="accent-green-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400">Taille: {calibrationData.gridSize}px</label>
                <input 
                  type="range" 
                  min="1600" 
                  max="2048" 
                  value={calibrationData.gridSize}
                  onChange={(e) => setCalibrationData(prev => ({ ...prev, gridSize: Number(e.target.value) }))}
                  className="accent-purple-500"
                />
              </div>
            </div>
            <p className="text-xs text-yellow-400/80 text-center mt-3">
              Ajustez la bordure rouge pour qu&apos;elle s&apos;aligne avec les cases du plateau !
            </p>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-xl rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            ⚔️ LANCER LA PARTIE ⚔️
          </button>
        </div>
      )}

      {/* Playing Phase Controls */}
      {gamePhase === 'playing' && (
        <div className="flex gap-4 w-full justify-center">
          <button 
            onClick={() => setManualFlip(!manualFlip)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white rounded-full transition-all shadow-lg font-bold"
          >
            <span>🔄</span>
            <span>Pivoter</span>
          </button>
          <button 
            onClick={() => setGamePhase('calibration')}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full font-bold transition-all"
          >
            🛠️ Recalibrer
          </button>
        </div>
      )}
    </div>
  );
};

