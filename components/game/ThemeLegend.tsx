import { Card } from '@/components/ui/Card';
import { Crown, Sparkles, Shield, Castle, Heart, Zap, Rabbit, Sword, Circle, Hexagon, Flower } from 'lucide-react';

export const ThemeLegend = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <Card theme="naomy" className="p-4">
        <h3 className="text-lg font-bold text-naomy-primary mb-3 text-center">Armée Koala 🐨</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-naomy-primary" /> Roi</div>
          <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-naomy-secondary" /> Reine</div>
          <div className="flex items-center gap-2"><Castle className="w-4 h-4 text-naomy-primary" /> Tour</div>
          <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-naomy-secondary" /> Fou</div>
          <div className="flex items-center gap-2"><Rabbit className="w-4 h-4 text-naomy-primary" /> Cavalier</div>
          <div className="flex items-center gap-2"><Flower className="w-4 h-4 text-naomy-secondary" /> Pion</div>
        </div>
      </Card>

      <Card theme="papa" className="p-4">
        <h3 className="text-lg font-bold text-papa-primary mb-3 text-center">Armée Titan 🐓</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-papa-primary" /> Roi</div>
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-papa-secondary" /> Reine</div>
          <div className="flex items-center gap-2"><Castle className="w-4 h-4 text-papa-primary" /> Tour</div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-papa-secondary" /> Fou</div>
          <div className="flex items-center gap-2"><Sword className="w-4 h-4 text-papa-primary" /> Cavalier</div>
          <div className="flex items-center gap-2"><Hexagon className="w-4 h-4 text-papa-secondary" /> Pion</div>
        </div>
      </Card>
    </div>
  );
};
