import Head from 'next/head';
import BottomNav from '@/components/BottomNav';
import { Search } from 'lucide-react';
import Link from 'next/link';

const NEW_MATCHES = [
  { id: 4, name: "Arjun", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80" },
  { id: 5, name: "Kavya", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { id: 6, name: "Siddharth", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
];

const CONVERSATIONS = [
  {
    id: 1,
    name: "Aisha",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    lastMessage: "I still can't believe you hate coffee ☕",
    time: "2m ago",
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    name: "Rohan",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    lastMessage: "Are we still on for tomorrow?",
    time: "1h ago",
    unread: 0,
    isOnline: false
  },
  {
    id: 'cupid',
    name: "Cupid AI",
    image: "/images/cupid.png", // We'll style this specially
    lastMessage: "I found 3 new profiles with opposite tastes!",
    time: "3h ago",
    unread: 1,
    isSystem: true
  }
];

export default function ChatList() {
  return (
    <>
      <Head>
        <title>Messages | MisMatch</title>
      </Head>
      <main className="min-h-screen bg-[#FAFAFE] pb-24">
        
        {/* Header */}
        <header className="p-6 pb-4 bg-white/50 backdrop-blur-md sticky top-0 z-10 border-b border-[#F3F0FF]">
          <h1 className="text-2xl font-bold text-[#1E1B2E] mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
            <input 
              type="text" 
              placeholder="Search matches or messages" 
              className="w-full bg-white border border-[#F3F0FF] rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-[#A78BFA] transition-colors text-sm text-[#1E1B2E] placeholder-[#9CA3AF] shadow-[0_2px_12px_rgba(167,139,250,0.04)]"
            />
          </div>
        </header>

        <div className="p-6 space-y-8">
          
          {/* New Matches (Horizontal Scroll) */}
          <section>
            <h2 className="text-sm font-bold text-[#1E1B2E] mb-4 uppercase tracking-wider">New Matches</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              <div className="flex flex-col items-center gap-2 min-w-[72px]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] p-[2px]">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#A78BFA] text-xl">✨</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1E1B2E]">Likes</span>
              </div>
              
              {NEW_MATCHES.map(match => (
                <Link href={`/chat/${match.id}`} key={match.id} className="flex flex-col items-center gap-2 min-w-[72px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent">
                    <img src={match.image} alt={match.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-medium text-[#6B7280]">{match.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Conversations List */}
          <section>
            <h2 className="text-sm font-bold text-[#1E1B2E] mb-4 uppercase tracking-wider">Conversations</h2>
            <div className="space-y-4">
              {CONVERSATIONS.map(chat => (
                <Link href={`/chat/${chat.id}`} key={chat.id} className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-[0_2px_12px_rgba(167,139,250,0.04)] border border-[#F3F0FF] active:scale-95 transition-transform">
                  
                  {/* Avatar */}
                  <div className="relative">
                    {chat.isSystem ? (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#FDBA74] flex items-center justify-center shadow-inner">
                        <span className="text-2xl text-white">🤖</span>
                      </div>
                    ) : (
                      <img src={chat.image} alt={chat.name} className="w-14 h-14 rounded-full object-cover" />
                    )}
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#86EFAC] rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Text content */}
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-bold ${chat.isSystem ? 'text-[#F59E0B]' : 'text-[#1E1B2E]'}`}>
                        {chat.name}
                      </h3>
                      <span className="text-xs font-medium text-[#9CA3AF]">{chat.time}</span>
                    </div>
                    <p className={`text-sm truncate ${chat.unread ? 'text-[#1E1B2E] font-semibold' : 'text-[#6B7280]'}`}>
                      {chat.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {chat.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-[#A78BFA] flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-[#A78BFA]/30">
                      {chat.unread}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <BottomNav />
      </main>
    </>
  );
}
