'use client';

import { useGameStore } from '@/lib/store';
import { ChessSquare } from './ChessSquare';
import { useEffect, useState } from 'react';
import { Player } from '@/lib/types';
import { getBoardConfig } from '@/lib/pieces';
import Image from 'next/image';

interface ChessBoardProps {
  playerView: Player;
  boardId?: string;
}

export const ChessBoard = ({ playerView, boardId = 'split-dual' }: ChessBoardProps) => {
  const [useCalibrationBoard, setUseCalibrationBoard] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [calibrationData, setCalibrationData] = useState({
    offsetX: 100, // Default 100
    offsetY: 100, // Default 100
    gridSize: 1848, // Default 1848
  });

  const { board, selectedSquare, validMoves, selectSquare, movePiece, initGame } = useGameStore();
  
  const boardConfig = getBoardConfig(boardId);

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
    if (validMoves.some(m => m.row === row && m.col === col)) {
      movePiece({ row, col });
    } else {
      selectSquare({ row, col });
    }
  };

  const currentBoardImage = useCalibrationBoard 
    ? '/assets/boards/plateau-de-reglage.png'
    : (boardConfig?.imagePath || '/assets/boards/board-split-dual.png');

  return (
    <div className="flex flex-col gap-4 items-center">
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
          className={`absolute z-10 grid grid-cols-8 grid-rows-8 gap-0 ${useCalibrationBoard ? 'border-2 border-red-500 bg-red-500/10' : ''}`}
          style={{
            top: borderOffsetY,
            left: borderOffsetX,
            width: gridSize,
            height: gridSize,
          }}
        >
          {(() => {
            // Logic to invert the board if player is Papa (Black) OR manual flip is active
            // XOR Logic: (View === Papa) XOR (ManualFlip)
            // If View Papa (Black) & ManualFlip (False) => Flipped (Black Perspective)
            // If View Papa (Black) & ManualFlip (True) => Normal (White Perspective)
            // If View Naomy (White) & ManualFlip (True) => Flipped (Black Perspective)
            
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
        
        {/* Decorative corners */}
        {!useCalibrationBoard && (
          <>
            <div className="absolute top-2 left-2 text-2xl opacity-70 z-20 pointer-events-none">🏰</div>
            <div className="absolute top-2 right-2 text-2xl opacity-70 z-20 pointer-events-none">🏰</div>
            <div className="absolute bottom-2 left-2 text-2xl opacity-70 z-20 pointer-events-none">⚔️</div>
            <div className="absolute bottom-2 right-2 text-2xl opacity-70 z-20 pointer-events-none">⚔️</div>
          </>
        )}
      </div>

      {/* Controls Bar */}
      <div className="flex gap-4 w-full justify-center">
        {/* Flip Toggle */}
        <button 
          onClick={() => setManualFlip(!manualFlip)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white rounded-full transition-all shadow-lg font-bold"
        >
          <span>🔄</span>
          <span>Pivoter le plateau</span>
        </button>

        {/* Calibration Toggle */}\
        <button 
          onClick={() => setUseCalibrationBoard(!useCalibrationBoard)}
          className={`
            px-4 py-2 rounded-full font-bold transition-all
            ${useCalibrationBoard 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/50 shadow-lg' 
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }
          `}
        >
          {useCalibrationBoard ? '🛠️ MODE CALIBRAGE' : '⚡ Calibrage'}
        </button>
      </div>

        {useCalibrationBoard && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400">Offset X (Left): {calibrationData.offsetX}px</label>
              <input 
                type="range" 
                min="0" 
                max="300" 
                value={calibrationData.offsetX}
                onChange={(e) => setCalibrationData(prev => ({ ...prev, offsetX: Number(e.target.value) }))}
                className="accent-blue-500"
              />
              <input 
                type="number" 
                value={calibrationData.offsetX}
                onChange={(e) => setCalibrationData(prev => ({ ...prev, offsetX: Number(e.target.value) }))}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400">Offset Y (Top): {calibrationData.offsetY}px</label>
              <input 
                type="range" 
                min="0" 
                max="300" 
                value={calibrationData.offsetY}
                onChange={(e) => setCalibrationData(prev => ({ ...prev, offsetY: Number(e.target.value) }))}
                className="accent-green-500"
              />
              <input 
                type="number"
                value={calibrationData.offsetY}
                onChange={(e) => setCalibrationData(prev => ({ ...prev, offsetY: Number(e.target.value) }))}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400">Grid Size: {calibrationData.gridSize}px</label>
              <input 
                type="range" 
                min="1600" 
                max="2048" 
                value={calibrationData.gridSize}
                onChange={(e) => setCalibrationData(prev => ({ ...prev, gridSize: Number(e.target.value) }))}
                className="accent-purple-500"
              />
              <input 
                type="number"
                value={calibrationData.gridSize}
                onChange={(e) => setCalibrationData(prev => ({ ...prev, gridSize: Number(e.target.value) }))}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
              />
            </div>

            <div className="col-span-full pt-2 border-t border-slate-700/50">
               <p className="text-xs text-yellow-400/80 text-center">
                 Ajustez les sliders jusqu&apos;à ce que la bordure rouge s&apos;aligne parfaitement avec les lignes du plateau !
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
