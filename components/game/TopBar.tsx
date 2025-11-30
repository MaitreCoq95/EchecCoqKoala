import { useGameStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const TopBar = () => {
  const { turn, resetGame, winner } = useGameStore();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm rounded-b-2xl mb-8">
      <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
        ← Accueil
      </Button>

      <div className="text-center">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-naomy-primary to-papa-secondary flex flex-col items-center gap-1">
          {winner ? (
            <span className="animate-pulse">
              {winner === 'naomy' ? 'Victoire Naomy ! 🎉' : 'Victoire Papa ! 💪'}
            </span>
          ) : (
            <span>
              Tour de <span className={turn === 'naomy' ? 'text-naomy-primary' : 'text-papa-secondary'}>
                {turn === 'naomy' ? 'Naomy' : 'Papa'}
              </span>
            </span>
          )}
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">v2.0 Super Powers</span>
        </h2>
      </div>

      <Button variant="outline" size="sm" onClick={resetGame}>
        Recommencer
      </Button>
    </div>
  );
};
