import Head from 'next/head';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { SlidersHorizontal, Bell, X, Heart, Star } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

// Mock Profile Data
const PROFILES = [
  {
    id: 1,
    name: "Tamizh",
    age: 19,
    area: "KNK",
    mismatchScore: 99.9,
    image: "/images/tamizh.png",
    hobbies: ["shopping", "hangouts"],
    differences: ["Feminist", "hater promax"]
  },
  {
    id: 2,
    name: "Rohan",
    age: 28,
    area: "Besant Nagar",
    mismatchScore: 76,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
    hobbies: ["Surfing", "Dogs"],
    differences: ["Loves chaos", "Can't cook"]
  },
  {
    id: 3,
    name: "Priya",
    age: 25,
    area: "T Nagar",
    mismatchScore: 92,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
    hobbies: ["Art", "Vegan"],
    differences: ["Extrovert", "Night owl"]
  }
];

export default function Home() {
  const [cards, setCards] = useState(PROFILES);

  // Swipe logic
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped right (Like)
      setCards((prev) => prev.slice(1));
    } else if (info.offset.x < -100) {
      // Swiped left (Pass)
      setCards((prev) => prev.slice(1));
    }
  };

  const activeCard = cards[0];

  return (
    <>
      <Head>
        <title>Discover | MisMatch</title>
      </Head>
      <main className="min-h-screen bg-[#FAFAFE] pb-24 overflow-hidden flex flex-col">
        
        {/* Top Bar */}
        <header className="flex justify-between items-center p-6 pb-2">
          <button className="p-3 bg-white rounded-full shadow-[0_2px_12px_rgba(167,139,250,0.08)] text-[#1E1B2E] active:scale-95 transition-transform">
            <SlidersHorizontal size={20} />
          </button>
          <div className="flex items-center gap-1">
            <span className="text-[#A78BFA] text-2xl">💜</span>
            <span className="font-bold text-xl tracking-tight text-[#1E1B2E]">MisMatch</span>
          </div>
          <button className="p-3 bg-white rounded-full shadow-[0_2px_12px_rgba(167,139,250,0.08)] text-[#1E1B2E] active:scale-95 transition-transform relative">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#F9A8D4] rounded-full border-2 border-white"></span>
          </button>
        </header>

        {/* Card Stack */}
        <div className="flex-1 relative flex items-center justify-center p-6 w-full max-w-md mx-auto">
          {cards.length > 0 ? (
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x, rotate, opacity }}
              whileTap={{ cursor: 'grabbing' }}
              className="absolute w-full h-[65vh] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden cursor-grab z-10"
            >
              {/* Profile Image */}
              <div 
                className="w-full h-[70%] bg-cover bg-center"
                style={{ backgroundImage: `url(${activeCard.image})` }}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                        {activeCard.name}, {activeCard.age}
                      </h2>
                      <p className="text-white/90 flex items-center gap-1 text-sm mt-1">
                        📍 {activeCard.area}
                      </p>
                    </div>
                    {/* MisMatch Score Badge */}
                    <div className="bg-[#A78BFA] text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-lg flex items-center gap-1">
                      🔥 {activeCard.mismatchScore}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 h-[30%] bg-white flex flex-col justify-center gap-4">
                <div className="flex gap-2 flex-wrap">
                  {activeCard.hobbies.map(hobby => (
                    <span key={hobby} className="px-3 py-1 bg-[#F3F0FF] text-[#A78BFA] rounded-full text-xs font-semibold">
                      ✓ {hobby}
                    </span>
                  ))}
                  {activeCard.differences.map(diff => (
                    <span key={diff} className="px-3 py-1 bg-gray-100 text-[#6B7280] rounded-full text-xs font-semibold">
                      ✕ {diff}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center gap-6 mt-2">
                  <button onClick={() => setCards(prev => prev.slice(1))} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-red-500 shadow-[0_4px_14px_rgba(0,0,0,0.1)] active:scale-90 transition-transform border border-gray-100">
                    <X size={28} strokeWidth={3} />
                  </button>
                  <button className="w-12 h-12 mt-1 bg-white rounded-full flex items-center justify-center text-[#FCD34D] shadow-[0_4px_14px_rgba(0,0,0,0.1)] active:scale-90 transition-transform border border-gray-100">
                    <Star size={24} fill="currentColor" />
                  </button>
                  <button onClick={() => setCards(prev => prev.slice(1))} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#A78BFA] shadow-[0_4px_14px_rgba(0,0,0,0.1)] active:scale-90 transition-transform border border-gray-100">
                    <Heart size={28} strokeWidth={3} fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-[#9CA3AF]">
              <div className="text-6xl mb-4">🔮</div>
              <p className="text-lg font-medium">No more profiles today.</p>
              <p className="text-sm mt-2">Check back tomorrow for fresh MisMatches!</p>
            </div>
          )}
          
          {/* Background Mock Card for depth */}
          {cards.length > 1 && (
            <div className="absolute w-[90%] h-[60vh] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] -bottom-4 z-0 opacity-50 scale-95 transform"></div>
          )}
        </div>

        <BottomNav />
      </main>
    </>
  );
}
