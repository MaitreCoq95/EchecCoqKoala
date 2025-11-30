import { Button } from '@/components/ui/Button';
import { Snowflake, Shield, Zap, Heart, RefreshCw } from 'lucide-react';
import { Player } from '@/lib/types';

interface SuperPowerMenuProps {
  player: Player;
  energy: number;
  onActivate: (power: 'freeze' | 'shield' | 'teleport' | 'charm' | 'revive') => void;
  disabled?: boolean;
}

export const SuperPowerMenu = ({ player, energy, onActivate, disabled }: SuperPowerMenuProps) => {
  const theme = player;

  const powers = [
    { id: 'freeze', name: 'Cryo-Freeze', cost: 30, icon: Snowflake, desc: 'Gèle une pièce (2 tours)' },
    { id: 'shield', name: 'Bouclier Divin', cost: 50, icon: Shield, desc: 'Invulnérable (1 tour)' },
    { id: 'teleport', name: 'Téléportation', cost: 60, icon: Zap, desc: 'Déplacement instantané' },
    { id: 'charm', name: 'Charme', cost: 80, icon: Heart, desc: 'Vole une pièce adverse' },
    { id: 'revive', name: 'Résurrection', cost: 100, icon: RefreshCw, desc: 'Ramène une capture' },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-2 mt-4 w-full">
      {powers.map((power) => {
        const canAfford = energy >= power.cost;
        return (
          <Button
            key={power.id}
            theme={theme}
            variant={canAfford ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onActivate(power.id)}
            disabled={disabled || !canAfford}
            className={`w-full justify-between text-xs ${canAfford ? 'animate-pulse' : 'opacity-50'}`}
          >
            <span className="flex items-center gap-2">
              <power.icon className="w-3 h-3" />
              {power.name}
            </span>
            <span className="font-bold">{power.cost}%</span>
          </Button>
        );
      })}
    </div>
  );
};
