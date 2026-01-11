/**
 * Dosya Adı: app/page.tsx
 * Framework: Next.js + Tailwind CSS + Framer Motion
 */

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, MapPin, X, Heart, User, MessageCircle, Trophy } from 'lucide-react';

// MVP Veri Seti
const GYM_BUDDIES = [
  {
    id: 1,
    name: "Mert",
    age: 26,
    distance: "2 km",
    specialty: "Bodybuilding",
    stats: { bench: "110kg", squat: "140kg" },
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500"
  },
  {
    id: 2,
    name: "Selin",
    age: 24,
    distance: "5 km",
    specialty: "Crossfit",
    stats: { deadlift: "90kg", run: "5k/22dk" },
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500"
  },
  {
    id: 3,
    name: "Can",
    age: 29,
    distance: "800 m",
    specialty: "Powerlifting",
    stats: { squat: "180kg", total: "500kg" },
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=500"
  }
];

export default function GymBuddyApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    setLastDirection(direction);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setLastDirection(null);
    }, 200);
  };

  const currentProfile = GYM_BUDDIES[currentIndex];

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans select-none">
      
      {/* Üst Bar */}
      <header className="p-4 flex justify-between items-center border-b border-zinc-900 bg-black/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-lime-400 w-7 h-7" />
          <h1 className="text-xl font-black italic tracking-tighter tracking-widest uppercase">GymMatch</h1>
        </div>
        <div className="flex gap-4">
            <MessageCircle className="w-6 h-6 text-zinc-500" />
            <User className="w-6 h-6 text-zinc-500" />
        </div>
      </header>

      {/* Kaydırma Alanı */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        <AnimatePresence>
          {currentProfile ? (
            <motion.div
              key={currentProfile.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ 
                x: lastDirection === 'right' ? 500 : -500, 
                opacity: 0, 
                rotate: lastDirection === 'right' ? 25 : -25 
              }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) handleSwipe('right');
                if (info.offset.x < -100) handleSwipe('left');
              }}
              className="absolute w-full max-w-sm aspect-[3/4] sm:h-[550px] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-800 touch-none"
            >
              <img 
                src={currentProfile.image} 
                className="w-full h-full object-cover pointer-events-none shadow-inner"
                alt={currentProfile.name}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-extrabold">{currentProfile.name}, {currentProfile.age}</h2>
                  <div className="flex items-center gap-1 bg-lime-400 text-black px-2 py-1 rounded-md text-xs font-bold">
                    <Trophy size={14} /> {currentProfile.specialty}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-zinc-400 mb-4 text-sm font-medium">
                  <MapPin size={16} className="text-lime-400" />
                  <span>{currentProfile.distance} yakında</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(currentProfile.stats).map(([key, value]) => (
                    <div key={key} className="bg-zinc-800/50 border border-zinc-700 p-2 rounded-xl text-center">
                      <p className="text-[10px] uppercase text-zinc-500 font-bold">{key}</p>
                      <p className="text-sm font-bold text-lime-400">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                <Dumbbell className="text-zinc-700 w-10 h-10" />
              </div>
              <p className="text-zinc-400 mb-6 font-medium">Civardaki tüm sporcularla eşleştin!</p>
              <button 
                onClick={() => setCurrentIndex(0)}
                className="bg-white text-black px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                TEKRAR GÖZ AT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Aksiyon Butonları */}
      <footer className="pb-10 pt-4 flex justify-center items-center gap-6">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 shadow-xl active:scale-90 transition-all"
        >
          <X size={30} strokeWidth={3} />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 rounded-full bg-lime-400 flex items-center justify-center text-black shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-90 transition-all"
        >
          <Heart size={36} fill="currentColor" />
        </button>
      </footer>
    </div>
  );
}