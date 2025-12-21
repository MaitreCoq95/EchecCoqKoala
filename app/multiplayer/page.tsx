'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gameService } from '@/lib/gameService';
import { INITIAL_BOARD } from '@/lib/chessEngine';
import { motion } from 'framer-motion';

export default function MultiplayerPage() {
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [createName, setCreateName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;

    setIsCreating(true);
    setError(null);

    try {
      // Defaulting to asymmetric board for now, could add selection here too
      const code = await gameService.createGame(createName, INITIAL_BOARD, 'asymmetric');
      
      if (code) {
        setGameCode(code);
        // We don't redirect immediately to playing, we wait for opponent or show lobby
        // For simple flow, let's redirect to game but with 'waiting' status handling in game page
        // actually, game page expects player params.
        // Let's redirect to game page with code parameter
        router.push(`/game?code=${code}&player=naomy&name=${createName}&role=host`);
      } else {
        setError("Impossible de créer la partie. Réessayez.");
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim() || !joinName.trim()) return;

    setIsJoining(true);
    setError(null);

    try {
      const game = await gameService.joinGame(joinCode, joinName);
      
      if (game) {
        router.push(`/game?code=${game.code}&player=papa&name=${joinName}&role=guest`);
      } else {
        setError("Partie introuvable ou déjà commencée.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la connexion à la partie.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-blue-900 to-purple-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-4xl w-full border-2 border-white/20 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-black text-white text-center mb-12 drop-shadow-lg">
          🎮 Multijoueur
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Create Game Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500 text-center">
              Créer une Partie
            </h2>
            <form onSubmit={handleCreateGame} className="space-y-4">
               <div>
                <label className="block text-white/70 text-sm mb-2 font-bold">Ton Pseudo</label>
                <input
                  type="text"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="Pseudo"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isCreating || !createName}
                className="w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isCreating ? '⏳ Création...' : '✨ Créer la table'}
              </button>
            </form>
          </div>

          {/* Join Game Section */}
          <div className="space-y-6 md:border-l-2 md:border-white/10 md:pl-12">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500 text-center">
              Rejoindre une Partie
            </h2>
            <form onSubmit={handleJoinGame} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2 font-bold">Code de la partie</label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="EX: ABC123"
                  maxLength={6}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white text-center font-mono text-xl tracking-widest placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2 font-bold">Ton Pseudo</label>
                <input
                  type="text"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="Pseudo"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isJoining || !joinCode || !joinName}
                className="w-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isJoining ? '⏳ Connexion...' : '🚀 Rejoindre'}
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">
            {error}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-white/50 hover:text-white font-medium hover:underline transition-colors"
          >
            ← Retour au menu principal
          </button>
        </div>
      </div>
    </main>
  );
}
