'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleSelectRole = (role: 'naomy' | 'papa') => {
    // In a real app we might persist this, but for now we just navigate
    // The game page will handle the "viewpoint" or we can pass it via query param
    router.push(`/game?player=${role}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="z-10 text-center space-y-12 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-naomy-primary to-papa-secondary mb-4 drop-shadow-sm">
            Koala vs Coq
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium">
            Le duel épique : Magie vs Muscles !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4">
          {/* Naomy Side */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => handleSelectRole('naomy')}
          >
            <Card theme="naomy" className="h-full flex flex-col items-center justify-between gap-8 border-4 border-transparent hover:border-naomy-secondary transition-colors">
              <div className="text-8xl animate-bounce-slow">🐨🦄</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-naomy-primary">Je suis Naomy</h2>
                <p className="text-slate-500">Team Koala Queen Army</p>
              </div>
              <Button theme="naomy" size="xl" className="w-full">
                Jouer avec Magie ✨
              </Button>
            </Card>
          </motion.div>

          {/* Papa Side */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => handleSelectRole('papa')}
          >
            <Card theme="papa" className="h-full flex flex-col items-center justify-between gap-8 border-4 border-transparent hover:border-papa-secondary transition-colors">
              <div className="text-8xl animate-pulse-slow">🐓💪</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-blue-400">Je suis Papa</h2>
                <p className="text-slate-400">Team Coq Titan Army</p>
              </div>
              <Button theme="papa" size="xl" className="w-full">
                Jouer avec Puissance ⚡
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
