import { useGameStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const TopBar = () => {
  const { turn, resetGame, winner } = useGameStore();
  const router = useRouter();

  return (
              Tour de <span className={turn === 'naomy' ? 'text-naomy-primary' : 'text-papa-secondary'}>
                {turn === 'naomy' ? 'Naomy' : 'Papa'}
              </span>
            </span>
          )}
        </h2>
      </div>

      <Button variant="outline" size="sm" onClick={resetGame}>
        Recommencer
      </Button>
    </div>
  );
};
