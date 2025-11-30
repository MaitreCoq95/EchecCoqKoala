import { useGameStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const EndGameModal = () => {
  const { winner, resetGame } = useGameStore();
  const router = useRouter();

  if (!winner) return null;

  const isNaomy = winner === 'naomy';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <Card theme={winner} className="max-w-md w-full text-center space-y-6 border-4">
            <div className="text-8xl animate-bounce">
              {isNaomy ? '🦄✨' : '🐓🏆'}
            </div>
            
            <div className="space-y-2">
              <h2 className={`text-4xl font-black ${isNaomy ? 'text-naomy-primary' : 'text-papa-secondary'}`}>
                {isNaomy ? 'BRAVO NAOMY !' : 'VICTOIRE PAPA !'}
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                {isNaomy 
                  ? 'Tu es la Reine des Koalas ! 🐨👑' 
                  : 'Bien joué Champion ! 💪 (Mais Naomy t&apos;aura la prochaine fois !)'}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button theme={winner} size="lg" onClick={resetGame} className="w-full">
                Rejouer une partie 🔄
              </Button>
              <Button variant="ghost" onClick={() => router.push('/')} className="w-full">
                Retour à l&apos;accueil
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
